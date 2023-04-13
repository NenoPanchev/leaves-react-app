import {Box, Container, Grid, Paper, Typography} from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarBase from '../components/calendar/CalendarBase';
import AuthContext from '../contexts/AuthContext';
import UserBaseDetails from '../models/users/UserBaseDetails';

export default function DashBoard() {
    const { user } = React.useContext(AuthContext);
    const email = user?.getEmail();
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
           <Box sx={{backgroundColor: 'white', display: 'flex', justifyContent: 'center',height:'80%' ,width:'100%'}}>
            <img src="/404.jpg" alt="error-page" />
            </Box>
        </React.Fragment>
    )
}