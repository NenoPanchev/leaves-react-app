import {useEffect, useState} from "react";
import RequestService from "../../services/RequestService";
import {Grid, IconButton, Paper,} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {getFirstAndLastNameFromFullName} from "../../services/userService";
import {t} from "i18next";
import {IDaysUsedInMonth} from "../../models/interfaces/request/IDaysUsedInMonth";
import dayjs from "dayjs";
import './LeavesGrid.css'
import {DataGrid, GridAlignment, GridCellParams, GridColDef} from "@mui/x-data-grid";
import CustomGridToolbar from "../../components/common/CustomGridToolbar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function LeavesGrid() {
    const [daysUsedInMonth, setDaysUsedInMonth] = useState<IDaysUsedInMonth[]>([]);
    const currentDate = dayjs();
    const [date, setDate] = useState(currentDate);
    const daysInMonth = date.daysInMonth();
    const minDate = dayjs('2023-01-01');
    const maxDate = currentDate.month() === 11 ? dayjs(`${currentDate.year() + 1}-01-31`) : dayjs(`${currentDate.year()}-12-31`)
    const prevMonth = date.subtract(1, 'month').isAfter(minDate) ? date.subtract(1, 'month') : minDate;
    const nextMonth = date.add(1, 'month').isBefore(maxDate) ? date.add(1, 'month') : maxDate;
    const handlePrevMonth = async () => {
        setDate(prevMonth);
        try {
            const response = await RequestService.getAllByMonthView(prevMonth);
            setDaysUsedInMonth(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextMonth = async () => {
        setDate(nextMonth);
        try {
            const response = await RequestService.getAllByMonthView(nextMonth);
            setDaysUsedInMonth(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        RequestService.getAllByMonthView(date)
            .then((response: any) => {
                setDaysUsedInMonth(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [])

// TODO add remaining days info to the grid or page
    const columns: GridColDef[] = [
        {
            field: 'date',
            headerName: date.format('MMMM'),
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
        const dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
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

    function renderNameElement(element: IDaysUsedInMonth) {
        return (
            <>
                <TableRow>{element.name}</TableRow>
                <TableRow>
                    <TableCell>{t('Total days:')}</TableCell>
                    <TableCell>{t('Used:')}</TableCell>
                    <TableCell>{t('Left:')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{element.yearHistory.daysFromPreviousYear + element.yearHistory.contractDays}</TableCell>
                    <TableCell>{element.yearHistory.daysUsed}</TableCell>
                    <TableCell>{element.yearHistory.daysLeft}</TableCell>
                </TableRow>
            </>
        )
    }

    function renderMonthWithPaginationElement() {
        const formattedDate = date.format('MMM YYYY')
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
        console.log(dateString);
        console.log(formattedDateString);


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

    const myGridToolbarComponents: JSX.Element[] = [];
    // TODO add filter options to show/not admins; to show: only Leaves, only Home Office, both; to sort employees: alphabetically, by contract startDate
    return (
        <Grid sx={{width: '100%'}} component={Paper}>
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
                    height: 'auto',
                    '& .MuiDataGrid-virtualScroller': {
                        overflow: "hidden"
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                        justifyContent: 'center'
                    }
                }}
            />
        </Grid>
    );
}


