import { Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarBase from '../components/calendar/CalendarBase';
import AuthContext from '../contexts/AuthContext';


export default function DashBoard() {
    const {user} = React.useContext(AuthContext);
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
       
            <Grid container direction={'column'} sx={{backgroundColor: 'white', textAlign: 'center'}}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={5} md={5} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >

                </Paper>
              </Grid>
              {/* Calendar */}
              <Grid item  justifySelf="end">
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
                <Typography component={'h1'} variant={'h5'}>{t('Hello') +', ' + user?.getEmail()}</Typography>
                <Typography component={'h2'} >{t('These are your roles and permissions:')}</Typography>
                <Typography component={'h2'} >{t('Roles') + ': ' + roles.join(', ')}</Typography>
                <Typography component={'h2'} >{t('Permissions') + ': ' + permissions.join(', ')}</Typography>
                <Typography component={'h2'} >{t('Use them with caution!')}</Typography>
            </Grid>
        </React.Fragment>
    )
}