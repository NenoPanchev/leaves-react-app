import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import CustomErrorBoundary from '../../components/CustomErrorBoundary/CustomErrorBoundary';
import DrawerMenu, { DrawerMenuRef } from '../../components/nav/DrawerMenu';
import NavBar, { NavBarRef } from '../../components/nav/NavBar';
import './Home.css';
import RoutesComponent from './RoutesComponent';

const mdTheme = createTheme();
const RouteMemo = React.memo(RoutesComponent);

function HomeContent() {

  const navBarRef = React.useRef<NavBarRef>(null);
  const DrawerMenuRef = React.useRef<DrawerMenuRef>(null);
  
  const toggleDrawer = () => {
    if (navBarRef?.current && DrawerMenuRef?.current) {
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