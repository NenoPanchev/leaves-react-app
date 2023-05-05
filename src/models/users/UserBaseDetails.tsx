import * as React from 'react';

import { Card, Grid, Table } from '@mui/material';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as userService from '../../services/userService';

import { useTranslation } from 'react-i18next';
import '../SingleItemView.css';
import { IUserDetails } from '../interfaces/user/IUserDetails';


interface UserViewProp {
  email: string
}
const UserBaseDetails: React.FC<UserViewProp> = (props): JSX.Element => {


  const [user,setUser]=React.useState<IUserDetails>();

  const names= new Set(user?.roles.flatMap((role)=>  role.permissions.flatMap((permission)=> permission.name)));

  const { t } = useTranslation();


  React.useEffect(() => {
    const controller = new AbortController();
    userService.getUserByEmail(props.email,controller)
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
      return () => controller.abort();
  }, []);

  return (
    <React.Fragment>
       <Grid container direction={'row'} minWidth="100%" width="100%">
          <Card sx={{width:"100%"}}>
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
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Position') + ':'}</TableCell>
                  <TableCell>{user?.employeeInfo.typeName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Paid leave') + ':'}</TableCell>
                  <TableCell>{user?.employeeInfo.daysLeave}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
    </ React.Fragment>
  );
}
export default UserBaseDetails;
