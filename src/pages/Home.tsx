import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomErrorBoundary from '../components/CustomErrorBoundary/CustomErrorBoundary';

import Nav from '../components/nav/Nav';
import SignIn from './SignIn';
import StickyFooter from '../components/footer/StickyFooter';
import Roles from '../models/roles/AllRoles'
import { LogOut } from '../services/authService';
import Departments from '../models/departments/AllDepartments';
import Users from '../models/users/AllUsers';
import isAuth from '../hoc/isAuth';
import DashBoard from './DashBoard';
import RequestsGrid from '../models/RequestsGrid/RequestsGrid';
import TypeEmployeeGrid from '../models/TypeEmployeeGrid/TypeEmployeeGrid';
import { Typography } from '@mui/material';
import { t } from 'i18next';
import Calendar from '../components/calendar/Calendar';
import AddRequest3 from '../models/AddRequest/AddRequest';

const mdTheme = createTheme();

function HomeContent() {

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Nav />
        <Grid
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1.5,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <CustomErrorBoundary>

              <Grid flexShrink={'revert'} flexGrow={'revert'} container sx={{ height: 'calc(100% - 71.2px)', width: '100%',flexGrow: '100% '}}>
                <Routes>
                  <Route path='/' Component={isAuth(DashBoard)}></Route>
                  <Route path='/users' Component={isAuth(Users)}></Route>
                  <Route path='/departments' Component={isAuth(Departments)}></Route>
                  <Route path="/requests" element={<RequestsGrid />} />
                  <Route path="/types" element={<TypeEmployeeGrid />} />
                  <Route path='/addRequest' element={<AddRequest3 />}></Route>
                  <Route path='/calendar' element={<Calendar />}></Route>
                  <Route path='/roles' Component={isAuth(Roles)}></Route>
                  <Route path='/login' Component={SignIn}></Route>
                  <Route path='/logout' Component={LogOut}></Route>
                </Routes>
              </Grid>

          </CustomErrorBoundary>
          <StickyFooter />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default HomeContent;