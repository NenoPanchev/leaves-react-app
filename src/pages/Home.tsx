import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const mdTheme = createTheme();

function HomeContent() {

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Nav />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <CustomErrorBoundary>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Routes>
                  <Route path='/' Component={isAuth(DashBoard)}></Route>
                  <Route path='/users' Component={isAuth(Users)}></Route>
                  <Route path='/departments' Component={isAuth(Departments)}></Route>
                  <Route path='/roles' Component={isAuth(Roles)}></Route>
                  <Route path='/login' Component={SignIn}></Route>
                  <Route path='/logout' Component={LogOut}></Route>
                </Routes>
              </Grid>
            </Container>
          </CustomErrorBoundary>
          <StickyFooter />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomeContent;