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

export default function RoleView(props: ViewProps) {
  const {id} = props;

  const role = roleService.useFetchOne(id);

  return (
    <React.Fragment>
      <DialogTitle id="responsive-dialog-title">
        {"Role Details"}
      </DialogTitle>
      <DialogContent className='dialog'>
        <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>

                  <TableCell className='tableHeader' variant='head'>Id:</TableCell>


                  <TableCell>{role?.id}</TableCell>

                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Name:</TableCell>
                  <TableCell>{role?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Permissions:</TableCell>
                  <TableCell>{role?.permissions.map(p => p.name).join(', ')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Created At:</TableCell>
                  <TableCell>{role?.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Created By:</TableCell>
                  <TableCell>{role?.createdBy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Last Modified At:</TableCell>
                  <TableCell>{role?.lastModifiedAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Last Modified By:</TableCell>
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