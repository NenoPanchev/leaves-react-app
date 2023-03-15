import React, {Component, FC, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeIcon from '@mui/icons-material/AccountTree'; import LayersIcon from '@mui/icons-material/Layers';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

interface AdminBarProps {
    currentLocation: string
}

const AdminBar: FC<AdminBarProps> = (props): JSX.Element => {
    return (
<>
            <Link to='/' style={{textDecoration: 'none'}}>
                <ListItemButton
                selected={props.currentLocation === '/' ? true : false}>
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                
            </ListItemButton>
            </Link>

          <ListItemButton href='/users'
            selected={props.currentLocation === '/users' ? true : false}>
            <ListItemIcon>
              <PeopleIcon />

            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          <ListItemButton href='departments'
            selected={props.currentLocation === '/departments' ? true : false}>

            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText primary="Departments" />
          </ListItemButton>
          <ListItemButton href='/roles'
            selected={props.currentLocation === '/roles' ? true : false}>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItemButton>

        <Divider sx={{ my: 1 }} />

    <ListSubheader component="div" inset>
      Authentication
    </ListSubheader>
    <Link to={'/signin'}>
        <ListItemButton>
            <ListItemText>asd</ListItemText>
        </ListItemButton>
    </Link>
    <ListItemButton
    LinkComponent={Link} 
    href='/signin' 
      selected={props.currentLocation === '/signin' ? true : false}>

      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>

  </>
    );
}

export default AdminBar;