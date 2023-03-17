import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from '../components/footer/Footer';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Nav from '../components/nav/Nav';
import SignIn from './SignIn';
import StickyFooter from '../components/footer/StickyFooter';
import Roles from '../components/roles/AllRoles'

const mdTheme = createTheme();

function HomeContent() {
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'}}>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Routes>
                  <Route path='/'></Route>
                  <Route path='/roles' Component={Roles}></Route>
                  <Route path='/signin' Component={SignIn}></Route>
                </Routes>
            </Grid>
          </Container>
          <StickyFooter />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomeContent;