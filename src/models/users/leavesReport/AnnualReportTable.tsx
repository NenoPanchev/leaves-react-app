import * as React from 'react';
import { Table, TableContainer, TableHead, Paper } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { useTranslation } from 'react-i18next';
import { ILeavesAnnualReport } from '../../interfaces/user/LeavesReport/ILeavesAnnualReport';
import './AnnualReportTable.css'


export default function ContractTable(props: ILeavesAnnualReport) {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <TableContainer component={Paper} sx={{overflow: 'hidden'}}>
                <Table className='report-table' sx={{ minWidth: 700, overflow: 'clip'}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>{t('From previous year')}</TableCell>
                            <TableCell colSpan={1} />
                            <TableCell align='center'>{t('Contract days')}</TableCell>
                            <TableCell colSpan={1} />
                            <TableCell align='center'>{t('Days used')}</TableCell>
                            <TableCell colSpan={1} />
                            <TableCell align='center'>{t('Days left')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center' component="th" scope="row">
                                {props.fromPreviousYear}</TableCell>
                            <TableCell >+</TableCell>
                            <TableCell align='center'>{Math.round(props.contractDays)}</TableCell>
                            <TableCell align='center'>-</TableCell>
                            <TableCell align='center'>{props.daysUsed}</TableCell>
                            <TableCell align='center'>{'=>'}</TableCell>
                            <TableCell align="center">{props.daysLeft}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </ React.Fragment>
    );
}