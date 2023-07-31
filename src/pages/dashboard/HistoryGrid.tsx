import * as React from 'react';
import { TableCell, TableContainer, Paper, Table, TableHead, TableRow, TableBody } from '@mui/material';
import { t } from 'i18next';
import './HistoryGrid.css'

export default function AllEmployeesHistory() {

    const data = [
        {
            name: 'Христо Испиров',
            vacations: 30,
            taken: 12,
            remaining: 18,
        },
        {
            name: 'Антон Георгиев',
            vacations: 30,
            taken: 12,
            remaining: 18,
        },
        {
            name: 'Димитър Ставрев',
            vacations: 27,
            taken: 17,
            remaining: 10,
        },
        {
            name: 'Нено Панчев',
            vacations: 20,
            taken: 7,
            remaining: 13,
        },
        {
            name: 'Владимир Качаров',
            vacations: 15,
            taken: 5,
            remaining: 10,
        },
    ];

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

    const generateCells = (data: { name: string; vacations: number; taken: number; remaining: number; }[]) => {
        const cells = [];
        for (const employee of data) {
            cells.push(
                <TableCell key={`vacations-${employee.name}`} className='bold-border' />
            );
            cells.push(
                <TableCell key={`taken-${employee.name}`} align="center" className='border' >
                    1, 2, 3
                </TableCell>
            );
            cells.push(
                <TableCell key={`remaining-${employee.name}`} className='border' />
            );
        }
        return cells;
    };


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label="vacation grid">
                <TableHead className='gray-background border-bottom'>
                    <TableRow>
                        <TableCell />
                        {data.map((employee) => (
                            <TableCell key={`vacations-header-${employee.name}`}
                                colSpan={3}
                                align='center'
                                className='bold-border'
                                sx={{borderBottom: '1px solid black'}}
                                >
                                {employee.name}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        {data.map((employee) => (
                            <React.Fragment key={`vacations-header-${employee.name}`}>
                                <TableCell align='center' className='bold-border border-bottom' >{t('total')}</TableCell>
                                <TableCell align='center' className='border border-bottom' >{t('used')}</TableCell>
                                <TableCell align='center' className='border border-bottom' >{t('left')}</TableCell>
                            </React.Fragment>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableCell className='border-bottom' />
                        {data.map((employee) => (
                            <React.Fragment key={`vacations-header-${employee.name}`}>
                                <TableCell align="center" className='bold-border border-bottom' >{employee.vacations}</TableCell>
                                <TableCell align="center" className='border border-bottom' >{employee.taken}</TableCell>
                                <TableCell align="center" className='border border-bottom' >{employee.remaining}</TableCell>
                            </React.Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {months.map((month) => (
                        <TableRow key={month}>
                            <TableCell>{t(month)}</TableCell>
                            {generateCells(data)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}
