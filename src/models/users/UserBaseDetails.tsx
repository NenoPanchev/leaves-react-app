import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as userService from '../../services/userService';

import '../SingleItemView.css'
import { useTranslation } from 'react-i18next';
import { IUserDetails } from '../interfaces/user/userInterfaces';
import { useEffect } from 'react';

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

const UserBaseDetails: React.FC<UserViewProp> = (props): JSX.Element => {

  const user = userService.useFetchOne(1);
  const names = new Set<string>();
  const { t } = useTranslation();
  console.log(user);
  user?.roles.forEach(role => {
    role.permissions.forEach(permission => {
        names.add(permission.name);
    })
})


  return (
    <React.Fragment>
       <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Id') + ':'}</TableCell>
                  <TableCell>{user?.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Name') + ':'}</TableCell>
                  <TableCell>{user?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Email') + ':'}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Department') + ':'}</TableCell>
                  <TableCell>{user?.department}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Roles') + ':'}</TableCell>
                  <TableCell>{user?.roles.map(r => r.name).join(', ')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Permissions') + ':'}</TableCell>
                  <TableCell>{Array.from(names).join(', ')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
    </ React.Fragment>
  );
}
export default UserBaseDetails;