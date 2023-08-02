import { TableCell, TableContainer, Paper, Table, TableHead, TableRow, TableBody, Grid, IconButton } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { IDaysUsedByMonth } from '../../models/interfaces/request/IDaysUsedByMonth';
import RequestService from '../../services/RequestService';
import './HistoryTable.css'
import { ChevronLeft, ChevronRight } from '@mui/icons-material';



export default function AllEmployeesHistory() {
    const [history, setHistory] = useState<IDaysUsedByMonth[]>([]);
    const currentYear = new Date().getFullYear();
    const minYear = 2022;
    const maxYear = new Date().getMonth() === 11 ? currentYear + 1 : currentYear;
    const [year, setYear] = useState(currentYear);
    const initialRender = useRef(true);
    console.log(initialRender);
    console.log(initialRender.current);
    
    

    const handlePrevYear = () => {
        setYear((prevYear) => Math.max(prevYear - 1, minYear));
    };

    const handleNextYear = () => {
        setYear((prevYear) => Math.min(prevYear + 1, maxYear));
    };
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        RequestService.getAllInTableView(year)
            .then((response: any) => {
                setHistory(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [year])

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
