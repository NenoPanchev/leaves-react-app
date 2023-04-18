import * as React from 'react';

import { Grid, Card, Table } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as userService from '../../services/userService';

import '../SingleItemView.css'
import { useTranslation } from 'react-i18next';


interface UserViewProp {
  email: string
}
const UserBaseDetails: React.FC<UserViewProp> = (props): JSX.Element => {

  const user = userService.useFetchOneEmail(props.email);
  console.log(user)
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
          <Card >
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
                  <TableCell className='tableHeader' variant='head'>{t('AnnualPaidLeaveFromType') + ':'}</TableCell>
                  <TableCell>{user?.employeeInfoDto.typeDaysLeave}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('LeftAnnualPaidLeave') + ':'}</TableCell>
                  <TableCell>{user?.employeeInfoDto.daysLeave}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
    </ React.Fragment>
  );
}
export default UserBaseDetails;