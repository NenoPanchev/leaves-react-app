import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as contractService from '../../services/contractService';

import { useTranslation } from 'react-i18next';
import { IViewProps } from '../interfaces/common/IViewProps';
import '../SingleItemView.css'


export default function ContractView(props: IViewProps) {

    const contract = contractService.useFetchOne(props.id);
    const { t } = useTranslation();


    return (
        <React.Fragment>
            <Grid container direction="row" >
                <DialogTitle id="responsive-dialog-title">
                    {t('Contract Details')}
                </DialogTitle>
            </Grid>
            <DialogContent className='dialog'>
                <Grid container direction={'row'}>
                    <Card style={{ width: '50%' }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='tableHeader' variant='head'>{t('Position') + ':'}</TableCell>
                                    <TableCell>{contract?.typeName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='tableHeader' variant='head'>{t('Start date') + ':'}</TableCell>
                                    <TableCell>{contract?.startDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='tableHeader' variant='head'>{t('End date') + ':'}</TableCell>
                                    <TableCell>{contract?.endDate}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                    <Card style={{ width: '50%' }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='tableHeader' variant='head'>{t('Created At') + ':'}</TableCell>
                                    <TableCell>{contract?.createdAt}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='tableHeader' variant='head'>{t('Created By') + ':'}</TableCell>
                                    <TableCell>{contract?.createdBy}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='tableHeader' variant='head'>{t('Last Modified At') + ':'}</TableCell>
                                    <TableCell>{contract?.lastModifiedAt}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='tableHeader' variant='head'>{t('Last Modified By') + ':'}</TableCell>
                                    <TableCell>{contract?.lastModifiedBy}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </DialogContent>
        </ React.Fragment>
    );
}