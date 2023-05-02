import * as React from 'react';

import { Backdrop, Card, CircularProgress, Grid, Table } from '@mui/material';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as userService from '../../services/userService';

import { useTranslation } from 'react-i18next';
import { IUserDetails } from '../interfaces/user/IUserDetails';
import '../SingleItemView.css';


interface UserViewProp {
  email: string
}
const UserBaseDetails: React.FC<UserViewProp> = (props): JSX.Element => {


  const [user,setUser]=React.useState<IUserDetails>();
  const [loading,setLoading]=React.useState(true);

  // const user = userService.useFetchOneEmail(props.email);
  const names = new Set<string>();
  const { t } = useTranslation();
  React.useEffect(() => {
    userService.getUserByEmail(props.email)
      .then((r) => {
        console.log(r);
        setUser(r.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  user?.roles.forEach(role => {
    role.permissions.forEach(permission => {
        names.add(permission.name);
    })
})



  return (
    <React.Fragment>
      {/* <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}>

      <CircularProgress color="inherit" />
    </Backdrop> */}
       <Grid container direction={'row'} minWidth="100%" width="100%">
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
