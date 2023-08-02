import { TableCell, TableContainer, Paper, Table, TableHead, TableRow, TableBody, Grid } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import { IDaysUsedByMonth } from '../../models/interfaces/request/IDaysUsedByMonth';
import RequestService from '../../services/RequestService';
import './HistoryTable.css'



export default function AllEmployeesHistory() {
    const [history, setHistory] = useState<IDaysUsedByMonth[]>([]);
    RequestService.getAllInTableView(2023)
        .then((response: any) => {
            setHistory(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });


    const months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const generateCells = (history: IDaysUsedByMonth[], month: string) => {
        const cells = [];
        for (const employee of history) {
            cells.push(
                <TableCell key={`taken-${employee.name}`} align="center" className='border'>
                    {employee.monthDaysUsed.hasOwnProperty(month)
                        ? employee.monthDaysUsed[month].join(', ')
                        : ''}
                </TableCell>
            );
        }
        return cells;
    };


    return (
        <Grid direction={'row'} width={'90%'}>
            <TableContainer component={Paper}>
                <Table aria-label="vacation grid" className='font-size'
                sx={{ 
                    minWidth: 800
                    }} >
                    <TableHead className='font-bold'>
                        <TableRow>
                            <TableCell className='border-bottom' />
                            {history.map((employee) => (
                                <TableCell key={`vacations-header-${employee.name}`}
                                    align='center'
                                    className='border border-bottom'
                                >
                                    {employee.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {months.map((month) => (
                            <TableRow key={month}>
                                <TableCell align='center'>{t(month)}</TableCell>
                                {generateCells(history, month)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );

}
