import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CustomErrorBoundary from '../../components/CustomErrorBoundary/CustomErrorBoundary';
import SignIn from '../SignIn';
import Roles from '../../models/roles/AllRoles'
import { LogOut } from '../../services/authService';
import Departments from '../../models/departments/AllDepartments';
import Users from '../../models/users/AllUsers';
import isAuth from '../../hoc/isAuth';
import DashBoard from '../dashboard/DashBoard';
import RequestsGrid from '../../models/RequestsGrid/RequestsGrid';
import TypeEmployeeGrid from '../../models/TypeEmployeeGrid/TypeEmployeeGrid';
import NotFound from '../NotFound';
import DashBoardByEmployee from '../dashboard/DashBoardByEmployee';
import NavBar, { NavBarRef } from '../../components/nav/NavBar';
import './Home.css'
import React, { useCallback } from 'react';
import DrawerMenu , { DrawerMenuRef } from '../../components/nav/DrawerMenu';
import RoutesComponent from './RoutesComponent';

const mdTheme = createTheme();

function HomeContent() {
  const RouteMemo = React.memo(RoutesComponent);
  const navBarRef = React.useRef<NavBarRef>(null);
  const DrawerMenuRef = React.useRef<DrawerMenuRef>(null);
  
  const toggleDrawer = () => {
   console.log("toggleDrawer")
    if (navBarRef && navBarRef.current && DrawerMenuRef && DrawerMenuRef.current) {
      navBarRef.current.open();
      DrawerMenuRef.current.open();
    }

};

  return (
    <ThemeProvider theme={mdTheme}>
      <Grid className='grid-container' container height="100vh" maxWidth="auto">
        <CssBaseline />
        <NavBar ref={navBarRef}  onDrawerClick={toggleDrawer} />
        
        <DrawerMenu ref={DrawerMenuRef}  onDrawerClick={toggleDrawer} />

        <Grid
          container
          component="main"
          className='main-grid'
          flex={1}
          marginTop={localStorage.getItem('navBarHeight')!}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            overflow: 'auto',
          }}
        >

          <CustomErrorBoundary />
          <RouteMemo/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default HomeContent;