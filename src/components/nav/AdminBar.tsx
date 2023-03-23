import React, { Component, FC, ReactElement } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
import { styled } from '@mui/material';


const AdminBar = () => {
  const currentLocation = useLocation();
  return (
    <>
      <Link to='/' style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItemButton
          selected={currentLocation.pathname === '/' ? true : false}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />

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
          <ListItemText primary="Users" />
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
          <ListItemText primary="Departments" />
        </ListItemButton>
      </NavLink>
      <Link to='/roles' style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItemButton
          selected={currentLocation.pathname === '/roles' ? true : false}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="Roles" />
        </ListItemButton>
      </Link>
      <Divider sx={{ my: 1 }} />

      <ListSubheader component="div" inset>
        Authentication
      </ListSubheader>

      <Link to={'/login'} style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItemButton

          selected={currentLocation.pathname === '/login' ? true : false}>

          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
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
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Link>
    </>
  );
}

export default AdminBar;