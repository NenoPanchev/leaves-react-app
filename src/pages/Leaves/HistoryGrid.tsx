import {t} from 'i18next';
import {IDaysUsedInMonth} from "../../models/interfaces/request/IDaysUsedInMonth";
import {DataGrid, GridAlignment, GridColDef} from "@mui/x-data-grid";

import * as React from "react";

interface AllEmployeesHistoryProps {
    history: IDaysUsedInMonth[];
}
export default function HistoryGrid(props: AllEmployeesHistoryProps) {
    const columns: GridColDef[] = [
        {
            field: 'category',
            headerName: '',
            align: 'center',
            sortable: false,
            flex: 0.7,
        },
        ...props.history.map((element: IDaysUsedInMonth) => ({
            field: element.name,
            headerClassName: 'grid-header',
            align: 'center' as GridAlignment,
            flex: 1,
            sortable: false,
        })),
    ];
    const data = [
        {
            id: 'totalDaysRow',
            category: t('Total days:'),
            ...props.history.reduce(
                (acc, employee) => ({
                    ...acc,
                    [employee.name]: employee.yearHistory.daysFromPreviousYear + employee.yearHistory.contractDays,
                }),
                {}
            ),
        },
        {
            id: 'daysUsedRow',
            category: t('Days used:'),
            ...props.history.reduce(
                (acc, employee) => ({
                    ...acc,
                    [employee.name]: employee.yearHistory.daysUsed,
                }),
                {}
            ),
        },
        {
            id: 'daysLeftRow',
            category: t('Days left:'),
            ...props.history.reduce(
                (acc, employee) => ({
                    ...acc,
                    [employee.name]: employee.yearHistory.daysLeft,
                }),
                {}
            ),
        },
    ];

    return (
            <DataGrid
                columns={columns}
                rows={data}
                disableRowSelectionOnClick
                disableColumnMenu
                showColumnVerticalBorder
                showCellVerticalBorder
                disableColumnFilter
                density="compact"
                hideFooter
                localeText={{
                    toolbarColumns: t(`DataGridToolBar.Columns`)!,
                    toolbarDensity: t(`DataGridToolBar.Density`)!,
                    toolbarExport: t(`DataGridToolBar.Export`)!
                }}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        display: 'none'
                    }
                }}
            />
    )
};
