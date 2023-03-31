import * as React from 'react';
import AuthContext from '../contexts/AuthContext';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';


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
                <Typography component={'h1'} variant={'h5'}>{t('Hello') +', ' + user?.getEmail()}</Typography>
                <Typography component={'h2'} >{t('These are your roles and permissions:')}</Typography>
                <Typography component={'h2'} >{t('Roles') + ': ' + roles.join(', ')}</Typography>
                <Typography component={'h2'} >{t('Permissions') + ': ' + permissions.join(', ')}</Typography>
                <Typography component={'h2'} >{t('Use them with caution!')}</Typography>
            </Grid>
        </React.Fragment>
    )
}