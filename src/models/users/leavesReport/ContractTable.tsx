import * as React from 'react';

import { Grid, Card, Table, Button, Typography, Accordion, AccordionSummary, AccordionDetails, TableContainer, TableHead, Paper } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { useTranslation } from 'react-i18next';
import { ILeavesAnnualReport } from '../../interfaces/user/LeavesReport/ILeavesAnnualReport';


export default function ContractTable(props: ILeavesAnnualReport) {
    const contractBreakdowns = props.contractBreakdowns;
    const { t } = useTranslation();

    function parseDouble(number: number) {
        const numberToString = number.toString();
        if (number % 1 === 0) {
            return numberToString;
        }
        let decimal = parseFloat(numberToString).toFixed(2);
        const result = '(' + Math.round(number) + ') ' + decimal;
        return result;
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Contract')}</TableCell>
                            <TableCell >{t('Position')}</TableCell>
                            <TableCell align='center'>{t('Start date')}</TableCell>
                            <TableCell align='center'>{t('End date')}</TableCell>
                            <TableCell align="right">{t('Days')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contractBreakdowns.map((contract, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1 + '.'}
                                </TableCell>
                                <TableCell >{contract.typeName}</TableCell>
                                <TableCell align='center'>{contract.startDate}</TableCell>
                                <TableCell align='center'>{contract.endDate? contract.endDate : '-'}</TableCell>
                                <TableCell align="right">{contract.daysGained.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell colSpan={4}/>
                            <TableCell align='right'>
                                { t('Total: ') + parseDouble(props.contractDays)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TableContainer>
        </ React.Fragment>
    );
}