import { TableCell, TableContainer, Paper, Table, TableHead, TableRow, TableBody, Grid, IconButton } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { IDaysUsedByMonth } from '../../models/interfaces/request/IDaysUsedByMonth';
import RequestService from '../../services/RequestService';
import './HistoryTable.css'
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {getFirstAndLastNameFromFullName} from "../../services/userService";



export default function AllEmployeesHistory() {
    const [history, setHistory] = useState<IDaysUsedByMonth[]>([]);
    const currentYear = new Date().getFullYear();
    const minYear = 2022;
    const maxYear = new Date().getMonth() === 11 ? currentYear + 1 : currentYear;
    const [year, setYear] = useState(currentYear);

    const handlePrevYear = async () => {
        const prevYear = Math.max(year - 1, minYear);
        setYear(prevYear);
        try {
            const response = await RequestService.getAllInTableView(prevYear);
            setHistory(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextYear = async () => {
        const nextYear = Math.min(year + 1, maxYear);
        setYear(nextYear);
        try {
            const response = await RequestService.getAllInTableView(nextYear);
            setHistory(response.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        RequestService.getAllInTableView(year)
            .then((response: any) => {
                setHistory(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [])

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
        <Grid container direction={'row'} width={'90%'}>
            <TableContainer component={Paper}>
                <Table aria-label="vacation grid" className='font-size'
                    sx={{
                        minWidth: 800
                    }} >
                    <TableHead className='font-bold'>
                        <TableRow>
                            <TableCell align='center' className='border-bottom'>
                                <IconButton onClick={handlePrevYear} disabled={year <= minYear}>
                                    <ChevronLeft />
                                </IconButton>
                                {year}
                                <IconButton onClick={handleNextYear} disabled={year >= maxYear}>
                                    <ChevronRight />
                                </IconButton>
                            </TableCell>
                            {history.map((employee) => (
                                <TableCell key={`vacations-header-${employee.name}`}
                                    align='center'
                                    className='border border-bottom'
                                >
                                    {getFirstAndLastNameFromFullName(employee.name)}
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
