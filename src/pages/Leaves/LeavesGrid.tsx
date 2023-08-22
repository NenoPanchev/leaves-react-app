import {useEffect, useState} from "react";
import RequestService from "../../services/RequestService";
import {Grid, IconButton, Paper} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {getFirstAndLastNameFromFullName} from "../../services/userService";
import {t} from "i18next";
import {IDaysUsedInMonth} from "../../models/interfaces/request/IDaysUsedInMonth";
import dayjs from "dayjs";
import './LeavesGrid.css'
import {DataGrid, GridAlignment, GridCellParams, GridColDef} from "@mui/x-data-grid";
import CustomGridToolbar from "../../components/common/CustomGridToolbar";
import {ILeavesGridFilter} from "../../models/interfaces/request/ILeavesGridFilter";
import {DEFAULT_LEAVES_GRID_FILTER} from "../../constants/GlobalConstants";
import * as React from "react";
import LeavesGridFilter from "./LeavesGridFilter";
import HistoryGrid from "./HistoryGrid";

export default function LeavesGrid(props: {clickerHeight: string}) {
    const [daysUsedInMonth, setDaysUsedInMonth] = useState<IDaysUsedInMonth[]>([]);
    const [filter, setFilter] = useState<ILeavesGridFilter>(DEFAULT_LEAVES_GRID_FILTER);
    const currentDate = dayjs();
    const daysInMonth = filter.date.daysInMonth();
    const minDate = dayjs('2023-01-01');
    const maxDate = currentDate.month() === 11
        ? dayjs(`${currentDate.year() + 1}-01-31`)
        : dayjs(`${currentDate.year()}-12-31`);

    const prevMonth = filter.date.subtract(1, 'month').isAfter(minDate)
        ? filter.date.subtract(1, 'month')
        : minDate;

    const nextMonth = filter.date.add(1, 'month').isBefore(maxDate)
        ? filter.date.add(1, 'month')
        : maxDate;

    const handlePrevMonth = async () => {
        setFilter({...filter, date: prevMonth});
    };

    const handleNextMonth = async () => {
        setFilter({...filter, date: nextMonth});
    };
    const historyGridHeight = '110px';
    const navBarHeight = localStorage.getItem('navBarHeight')!;
    let calcResult = `calc(100vh - ${navBarHeight} - ${props.clickerHeight} - ${historyGridHeight})`;

    useEffect(() => {
        RequestService.getAllByMonthView(filter)
            .then((response: any) => {
                setDaysUsedInMonth(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [filter])

    const columns: GridColDef[] = [
        {
            field: 'date',
            headerName: filter.date.format('MMMM'),
            headerClassName: 'grid-header',
            align: 'right',
            sortable: false,
            flex: 0.7,
            renderHeader: renderMonthWithPaginationElement
        },
        ...daysUsedInMonth.map((element: IDaysUsedInMonth) => ({
            field: element.name,
            headerName: getFirstAndLastNameFromFullName(element.name),
            headerClassName: 'grid-header',
            align: 'center' as GridAlignment,
            flex: 1,
            sortable: false,
            renderCell: (params: GridCellParams) => {
                return params.row[element.name] || '';
            },
        })),
    ];
    const rows = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${filter.date.year()}-${(filter.date.month() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const datejs = dayjs(dateString);
        const formattedDateString = datejs.format('ddd, MMM DD');
        const row: { [key: string]: any } = {
            id: day, date: formattedDateString,
        }
        daysUsedInMonth.forEach((element: IDaysUsedInMonth) => {
            row[element.name] = getDayCellString(day, dateString, formattedDateString, element);
        });
        rows.push(row);
    }

    function renderMonthWithPaginationElement() {
        const formattedDate = filter.date.format('MMM YYYY')
        return (
            <Grid justifyContent={'center'}>
                <IconButton onClick={handlePrevMonth}
                            disabled={minDate.format('MMM YYYY') === formattedDate}
                >
                    <ChevronLeft/>
                </IconButton>
                {formattedDate}
                <IconButton onClick={handleNextMonth}
                            disabled={maxDate.format('MMM YYYY') === formattedDate}
                >
                    <ChevronRight/>
                </IconButton>
            </ Grid>
        )
    }

    function getDayCellString(day: number, dateString: string, formattedDateString: string, element: IDaysUsedInMonth) {
        if (isWeekend(formattedDateString)) {
            return '';
        } else if (localStorage.getItem('Holidays')?.includes(dateString)) {
            return 'P';
        } else {
            switch (element.days[day]) {
                case 'LEAVE':
                    return 'H';
                case 'HOME_OFFICE':
                    return 'HO';
                default:
                    return '';
            }
        }
    }

    function isWeekend(cellString: string) {
        return cellString.includes('Sat') || cellString.includes('Sun') || cellString.includes('Съб') || cellString.includes('Нед');
    }

    const myGridToolbarComponents: JSX.Element[] = [
        <LeavesGridFilter key={'searchFilter'} filter={filter} setFilter={setFilter}/>
    ];
    return (
        <Grid sx={{width: '100%'}} component={Paper}>
            <Grid id={'historyGridId'} container direction={'row'} >
                <HistoryGrid history={daysUsedInMonth}/>
            </Grid>
            <Grid container direction={'row'} height={calcResult}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    localeText={{
                        toolbarColumns: t(`DataGridToolBar.Columns`)!,
                        toolbarDensity: t(`DataGridToolBar.Density`)!,
                        toolbarExport: t(`DataGridToolBar.Export`)!
                    }}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    showColumnVerticalBorder
                    showCellVerticalBorder
                    disableColumnFilter
                    density="compact"
                    hideFooter
                    getRowClassName={(params) => `${isWeekend(params.row.date) ? 'gray-background color-red' : ''
                    } ${currentDate.format('ddd, MMM DD') === params.row.date ? 'bold-border' : ''}`}
                    slots={{toolbar: () => <CustomGridToolbar components={myGridToolbarComponents}/>}}
                    sx={{
                        '& .MuiDataGrid-virtualScroller': {
                            overflowX: "hidden"
                        },
                        '& .MuiDataGrid-columnHeaderTitleContainer': {
                            justifyContent: 'center'
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
}


