import { Link, NavLink, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader, Divider, Typography, Grid } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import AddRequest3 from '../../models/AddRequest/AddRequest';
import Calendar from '../calendar/Calendar';


const AdminBar = () => {
  const currentLocation = useLocation();
  const { t, i18n } = useTranslation();
  return (
    <Grid item>

      <Link to={"/types"}  style={{
        textDecoration: 'none',
        color: 'black'
      }}>

        <ListItemButton
          selected={currentLocation.pathname === '/types' ? true : false}>

          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={t('LeaveType')} />
        </ListItemButton>
      </Link>

      <Link to={"/requests"}  style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItemButton
          selected={currentLocation.pathname === '/types' ? true : false}>

          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary=  {t('Request')} />
        </ListItemButton>
      </Link>

      <ListItemButton>
      <AddRequest3 />
      </ListItemButton>
      
      <ListItemButton>
      <Calendar />
      </ListItemButton>

      <Link to='/' style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItemButton
          selected={currentLocation.pathname === '/' ? true : false}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={t('Dashboard')} />

        </ListItemButton>
      </Link>

      <Link to='/users' style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItemButton
          selected={currentLocation.pathname === '/users' ? true : false}>
          <ListItemIcon>
            <PeopleIcon />

          </ListItemIcon>
          <ListItemText primary={t('Users')} />
        </ListItemButton>
      </Link>

      <NavLink to='/departments' style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItemButton
          selected={currentLocation.pathname === '/departments' ? true : false}>


          <ListItemIcon>
            <LocationCityIcon />
          </ListItemIcon>
          <ListItemText primary={t('Departments')} />
        </ListItemButton>
      </NavLink>

      <Link to='/roles' style={{
        textDecoration: 'none',
        color: 'black'
      }}
      >
        <ListItemButton
          selected={currentLocation.pathname === '/roles' ? true : false}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary={t('Roles')} />
        </ListItemButton>
      </Link>

      <Divider sx={{ my: 1 }} />

      <ListSubheader component="div" inset>
        {t('Authentication')}
      </ListSubheader>


      <Link to={'/login'} style={{
        textDecoration: 'none',
        color: 'black'
      }}
      >

        <ListItemButton

          selected={currentLocation.pathname === '/login' ? true : false}>

          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary={t('Login')} />
        </ListItemButton>

      </Link>

      <Link to={'/logout'} style={{
        textDecoration: 'none',
        color: 'black'
      }}>

        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t('Logout')} />
        </ListItemButton>
      </Link>
      </Grid>
  );
}

export default AdminBar;