import { TableCell, TableContainer, Paper, Table, TableHead, TableRow, TableBody, Grid } from '@mui/material';
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
                <TableCell key={`vacations-${employee.name}`} />
            );
            cells.push(
                <TableCell key={`taken-${employee.name}`} align="center"  >
                    1, 2, 3
                </TableCell>
            );
            cells.push(
                <TableCell key={`remaining-${employee.name}`} />
            );
        }
        return cells;
    };


    return (
        <Grid direction={'row'}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label="vacation grid">
                    <TableHead >
                        <TableRow>
                            <TableCell />
                            {data.map((employee) => (
                                <TableCell key={`vacations-header-${employee.name}`}
                                    colSpan={3}
                                    align='center'


                                >
                                    {employee.name}
                                </TableCell>
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
        </Grid>
    );

}
