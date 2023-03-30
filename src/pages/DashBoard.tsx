import * as React from 'react';
import AuthContext from '../contexts/AuthContext';
import { Grid, Typography } from '@mui/material';

export default function DashBoard() {
    const {user} = React.useContext(AuthContext);
    const authorities = user?.getAuthorities();
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
            <Grid container direction={'column'} sx={{backgroundColor: 'white'}}>
                <Typography component={'h1'} variant={'h5'}>{'Hello, ' + user?.getEmail()}</Typography>
                <Typography component={'h2'} >These are your roles and permissions:</Typography>
                <Typography component={'h2'} >{'Roles: ' + roles.join(', ')}</Typography>
                <Typography component={'h2'} >{'Permissions: ' + permissions.join(', ')}</Typography>
                <Typography component={'h2'} >Use them with caution!</Typography>
            </Grid>
        </React.Fragment>
    )
}