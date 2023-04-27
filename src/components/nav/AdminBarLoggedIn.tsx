import {ListItemButton, ListItemIcon, ListItemText, Divider, ListSubheader, Grid} from "@mui/material"
import {Link, useLocation} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../../contexts/AuthContext"
import {useTranslation} from "react-i18next"
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import ListIcon from '@mui/icons-material/List';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ChangePassword from "../../models/users/ChangePassword"

const AdminBarLoggedIn = () => {
    const {user} = useContext(AuthContext);
    const currentLocation = useLocation();
    const {t} = useTranslation();

    return (
        <Grid sx={{overflow:"hidden"}}>
            <Link to='/' style={{
                textDecoration: 'none',
                color: 'black'
            }
            }>
                <ListItemButton
                    selected={currentLocation.pathname === '/' ? true : false}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ ListItemIcon>
                    < ListItemText primary={t('Dashboard')}/>

                </ListItemButton>
            </ Link>
            {user?.hasRole('ADMIN') &&
                <>
                    < Link to={"/types"} style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>

                        <ListItemButton
                            selected={currentLocation.pathname === '/types' ? true : false}>

                            <ListItemIcon>
                                <BadgeIcon/>
                            </ ListItemIcon>
                            < ListItemText primary={t('LeaveType')}/>
                        </ListItemButton>
                    </ Link>

                    < Link to={"/requests"} style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        <ListItemButton
                            selected={currentLocation.pathname === '/requests' ? true : false}>

                            <ListItemIcon>
                                <ListIcon/>
                            </ ListItemIcon>
                            < ListItemText primary={t('Request')}/>
                        </ListItemButton>
                    </ Link>
                           
                    <Link to='/users' style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        <ListItemButton
                            selected={currentLocation.pathname === '/users' ? true : false}>
                            <ListItemIcon>
                                <PeopleIcon/>

                            </ ListItemIcon>
                            < ListItemText primary={t('Users')}/>
                        </ListItemButton>
                    </ Link>
                    <Link to='/departments' style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        <ListItemButton
                            selected={currentLocation.pathname === '/departments' ? true : false}>


                            <ListItemIcon>
                                <LocationCityIcon/>
                            </ ListItemIcon>
                            < ListItemText primary={t('Departments')}/>
                        </ListItemButton>
                    </ Link>

                    < Link to='/roles' style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        <ListItemButton
                            selected={currentLocation.pathname === '/roles' ? true : false}>
                            <ListItemIcon>
                                <AccountTreeIcon/>
                            </ ListItemIcon>
                            < ListItemText primary={t('Roles')}/>
                        </ListItemButton>
                    </ Link>
                </>}

            < Divider sx={{my: 1}}/>

            < ListSubheader component="div" inset>
                {t('Authentication')}
            </ ListSubheader>

            <ChangePassword />

            < Link to={'/logout'} style={{
                textDecoration: 'none',
                color: 'black'
            }}>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ ListItemIcon>
                    < ListItemText primary={t('Logout')}/>
                </ListItemButton>
            </ Link>
        </Grid>
    );
}

export default AdminBarLoggedIn;
