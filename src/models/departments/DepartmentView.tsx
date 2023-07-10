import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as departmentService from '../../services/departmentService';

import { useTranslation } from 'react-i18next';
import { IViewProps } from '../interfaces/common/IViewProps';
import '../SingleItemView.css'


export default function DepartmentView(props: IViewProps) {
  const department = departmentService.useFetchOne(props.id);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <DialogTitle id="responsive-dialog-title">
        {t('Department Details')}
      </DialogTitle>
      <DialogContent className='dialog'>
        <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Name') +':'}</TableCell>
                  <TableCell>{department?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Admin') +':'}</TableCell>
                  <TableCell>{department?.adminEmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Employees') +':'}</TableCell>
                  <TableCell>{department?.employeeEmails ? department?.employeeEmails.join(", \n") : ''}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Created At') +':'}</TableCell>
                  <TableCell>{department?.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Created By') +':'}</TableCell>
                  <TableCell>{department?.createdBy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Last Modified At') +':'}</TableCell>
                  <TableCell>{department?.lastModifiedAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Last Modified By') +':'}</TableCell>
                  <TableCell>{department?.lastModifiedBy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

        </Grid>
      </DialogContent>

    </ React.Fragment>
  );
}