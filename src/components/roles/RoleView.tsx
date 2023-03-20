import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Table } from '@mui/material';
import { Label } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import * as roleService from '../../services/roleService';

import './RoleView.css'

interface RoleViewProp {
  id: number
}


export default function RoleView(props: RoleViewProp) {

  const role = roleService.GetOne(props.id);

  return (
    <React.Fragment>
      <DialogTitle id="responsive-dialog-title">
        {"Role Details"}
      </DialogTitle>
      <DialogContent className='dialog'>
        <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>

            <Table>
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
            </Table>
          </Card>
          <Card style={{ width: '50%' }}>
            <Table>
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
            </Table>
          </Card>

        </Grid>
      </DialogContent>

    </ React.Fragment>
  );
}