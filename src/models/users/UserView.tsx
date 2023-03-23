import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as userService from '../../services/userService';

import '../SingleItemView.css'

interface UserViewProp {
  id: number
}

interface UserDetails {
    roles: [{
        name: string
        permissions: Permissions[]
      }]
}

interface Permissions {
        name: string
}

export default function UserView(props: UserViewProp) {

  const user = userService.useFetchOne(props.id);
  const names = new Set<string>();
  user?.roles.forEach(role => {
    role.permissions.forEach(permission => {
        names.add(permission.name);
    })
})

  return (
    <React.Fragment>
      <DialogTitle id="responsive-dialog-title">
        {"User Details"}
      </DialogTitle>
      <DialogContent className='dialog'>
        <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Id:</TableCell>
                  <TableCell>{user?.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Name:</TableCell>
                  <TableCell>{user?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Email:</TableCell>
                  <TableCell>{user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Department:</TableCell>
                  <TableCell>{user?.department}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Roles:</TableCell>
                  <TableCell>{user?.roles.map(r => r.name).join(', ')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Permissions:</TableCell>
                  <TableCell>{Array.from(names).join(', ')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Created At:</TableCell>
                  <TableCell>{user?.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Created By:</TableCell>
                  <TableCell>{user?.createdBy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Last Modified At:</TableCell>
                  <TableCell>{user?.lastModifiedAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>Last Modified By:</TableCell>
                  <TableCell>{user?.lastModifiedBy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

        </Grid>
      </DialogContent>

    </ React.Fragment>
  );
}