import { Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarBase from '../components/calendar/CalendarBase';
import AuthContext from '../contexts/AuthContext';
import UserBaseDetails from '../models/users/UserBaseDetails';
import { IUserDetails } from '../models/interfaces/user/userInterfaces';
import * as userService from '../services/userService';

export default function DashBoard() {
    const { user } = React.useContext(AuthContext);
    const authorities = user?.getAuthorities();
    const { t, i18n } = useTranslation();
    const roles = new Array;
    const permissions = new Array;
    authorities?.forEach(auth => {
        if (auth.startsWith('ROLE_')) {
            roles.push(auth.replaceAll('ROLE_', ''))
        } else {
            permissions.push(auth);
        }
    })
    return (
        <React.Fragment>
            {user!==null&&
 <Grid container direction={'column'} sx={{ backgroundColor: 'white', textAlign: 'center' }}>
 <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
   
     <Grid container spacing={3}>
         {/* User Details */}
         <Grid item xs={5} md={5} lg={5}>
             <Paper
                 sx={{
                     p: 2,
                     display: 'table',
                     flexDirection: 'column',
                     height: 240,
                 }}
             >
                 <Typography>My information:</Typography>
               
                   <UserBaseDetails id={1}/>
             </Paper>
         </Grid>

         {/* Calendar */}
         <Grid item justifySelf="end">
             <Paper
                 sx={{
                     p: 2,
                     display: 'table',
                     flexDirection: 'column',
                     height: 240,
                 }}
             >
                 <CalendarBase />

             </Paper>
         </Grid>

         {/* Recent Orders */}
         <Grid item xs={5}>
             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

             </Paper>
         </Grid>
     </Grid>
 </Container>
 <Typography component={'h1'} variant={'h5'}>{t('Hello') + ', ' + user?.getEmail()}</Typography>
 <Typography component={'h2'} >{t('These are your roles and permissions:')}</Typography>
 <Typography component={'h2'} >{t('Roles') + ': ' + roles.join(', ')}</Typography>
 <Typography component={'h2'} >{t('Permissions') + ': ' + permissions.join(', ')}</Typography>
 <Typography component={'h2'} >{t('Use them with caution!')}</Typography>
</Grid>
            }
           
        </React.Fragment>
    )
}