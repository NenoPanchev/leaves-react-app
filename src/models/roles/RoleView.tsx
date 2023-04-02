import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as roleService from '../../services/roleService';
import { ViewProps } from '../interfaces/common/commonInterfaces';

import '../SingleItemView.css'
import { useTranslation } from 'react-i18next';

export default function RoleView(props: ViewProps) {
  const {id} = props;
  const { t } = useTranslation();
  const role = roleService.useFetchOne(id);

  return (
    <React.Fragment>
      <DialogTitle id="responsive-dialog-title">
        {t('Role Details')}
      </DialogTitle>
      <DialogContent className='dialog'>
        <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>

                  <TableCell className='tableHeader' variant='head'>{t('Id') + ':'}</TableCell>


                  <TableCell>{role?.id}</TableCell>

                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Name') + ':'}</TableCell>
                  <TableCell>{role?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Permissions') + ':'}</TableCell>
                  <TableCell>{role?.permissions.map(p => p.name).join(', ')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Created At') + ':'}</TableCell>
                  <TableCell>{role?.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Created By') + ':'}</TableCell>
                  <TableCell>{role?.createdBy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Last Modified At') + ':'}</TableCell>
                  <TableCell>{role?.lastModifiedAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Last Modified By') + ':'}</TableCell>
                  <TableCell>{role?.lastModifiedBy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

        </Grid>
      </DialogContent>

    </ React.Fragment>
  );
}