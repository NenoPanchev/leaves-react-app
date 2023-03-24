import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as departmentService from '../../services/departmentService';

import '../SingleItemView.css'

interface DepartmentViewProp {
  id: number
}

export default function DepartmentView(props: DepartmentViewProp) {

  const department = departmentService.useFetchOne(props.id);


  return (
    <React.Fragment>
      <DialogTitle id="responsive-dialog-title">
        {"Department Details"}
      </DialogTitle>
      <DialogContent className='dialog'>
        <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>

                  <TableCell className='tableHeader' variant='head'>Id:</TableCell>


                  <TableCell>{department?.id}</TableCell>

                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Name:</TableCell>
                  <TableCell>{department?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Admin:</TableCell>
                  <TableCell>{department?.adminEmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Employees:</TableCell>
                  <TableCell>{department?.employeeEmails}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Created At:</TableCell>
                  <TableCell>{department?.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Created By:</TableCell>
                  <TableCell>{department?.createdBy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Last Modified At:</TableCell>
                  <TableCell>{department?.lastModifiedAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Last Modified By:</TableCell>
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