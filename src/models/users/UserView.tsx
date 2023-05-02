import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table, Button, Typography } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as userService from '../../services/userService';

import '../SingleItemView.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { IViewProps } from '../interfaces/common/IViewProps';
import LeavesReport from './leavesReport/LeavesReport';


export default function UserView(props: IViewProps) {

  const user = userService.useFetchOne(props.id);
  const currentUser = React.useContext(AuthContext);
  const names = new Set<string>();
  const { t } = useTranslation();
  user?.roles.forEach(role => {
    role.permissions.forEach(permission => {
      names.add(permission.name);
    })
  })

  let isCurrentUserThisUser = currentUser.user?.getEmail() === user?.email;
  return (
    <React.Fragment>
      <Grid container direction="row" >
        <DialogTitle id="responsive-dialog-title">
          {t('User Details')}
        </DialogTitle>


        {
          isCurrentUserThisUser ? (

            <Grid item marginLeft="auto" marginTop="auto" marginBottom="auto" marginRight="2%" >
              <Link to="/">
                <Button variant='outlined' >
                  <Typography variant="overline" component="div">
                    {t(`UserRequests`)!}
                  </Typography>
                </Button>
              </ Link>
            </Grid>


          ) : (


            <Grid item marginLeft="auto" marginTop="auto" marginBottom="auto" marginRight="2%">
              <Link to={{ pathname: `/requests/employee/${props.id}` }} style={{
                textDecoration: 'none',
                color: 'black'
              }}>

                <Button variant='outlined'>
                  <Typography variant="overline" component="div">
                    {t(`UserRequests`)!}
                  </Typography>
                </Button>
              </ Link>
            </Grid>
          )

        }


      </Grid>
      <DialogContent className='dialog'>
        <Grid container direction={'row'}>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
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
                  <TableCell className='tableHeader' variant='head'>{t('Start date') + ':'}</TableCell>
                  <TableCell>{user?.employeeInfo.contractStartDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card style={{ width: '50%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Created At') + ':'}</TableCell>
                  <TableCell>{user?.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Created By') + ':'}</TableCell>
                  <TableCell>{user?.createdBy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Last Modified At') + ':'}</TableCell>
                  <TableCell>{user?.lastModifiedAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Last Modified By') + ':'}</TableCell>
                  <TableCell>{user?.lastModifiedBy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Position') + ':'}</TableCell>
                  <TableCell>{user?.employeeInfo.typeName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='tableHeader' variant='head'>{t('Paid leave left') + ':'}</TableCell>
                  <TableCell>{user?.employeeInfo.daysLeave}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
        <LeavesReport id={props.id}></LeavesReport>
      </DialogContent>

    </ React.Fragment>
  );
}