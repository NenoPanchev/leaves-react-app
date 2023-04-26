import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import CustomErrorBoundary from '../components/CustomErrorBoundary/CustomErrorBoundary';

import Nav from '../components/nav/Nav';
import SignIn from './SignIn';
import Roles from '../models/roles/AllRoles'
import { LogOut } from '../services/authService';
import Departments from '../models/departments/AllDepartments';
import Users from '../models/users/AllUsers';
import isAuth from '../hoc/isAuth';
import DashBoard from './dashboard/DashBoard';
import RequestsGrid from '../models/RequestsGrid/RequestsGrid';
import TypeEmployeeGrid from '../models/TypeEmployeeGrid/TypeEmployeeGrid';
import AddRequest3 from '../models/AddRequest/AddRequest';
import NotFound from './NotFound';
import DashBoardByEmployee from './dashboard/DashBoardByEmployee';

const mdTheme = createTheme();

function HomeContent() {

  return (
    <ThemeProvider theme={mdTheme}>
      <Grid container  direction="row" height="100vh" maxWidth="auto">
        <CssBaseline />
        <Grid item > <Nav /></Grid>
      
        <Grid
        container
          component="main"
          flex={1}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            overflow: 'auto',

          }}
        >
          <Toolbar />

          <CustomErrorBoundary/>
              <Grid container height="90.5%" >
                <Routes>
                  <Route index Component={isAuth(DashBoard)}></Route>
                  <Route  path={"/requests/employee/:id"} Component={isAuth(DashBoardByEmployee)}></Route>
                  <Route path='/users' Component={isAuth(Users)}></Route>
                  <Route path='/departments' Component={isAuth(Departments)}></Route>
                  <Route path="/requests" Component={isAuth(RequestsGrid)} />
                  <Route path="/types" Component={isAuth(TypeEmployeeGrid)} />
                  <Route path='/roles' Component={isAuth(Roles)}></Route>
                  <Route path='/login' Component={SignIn}></Route>
                  <Route path='/logout' Component={LogOut}></Route>
                  <Route path="/404" Component={NotFound}></Route>

                  <Route path="*" element={<Navigate to="/404" replace />}></Route>
                </Routes>
              </Grid>
          {/* <StickyFooter /> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default HomeContent;