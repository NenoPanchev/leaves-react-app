import * as React from 'react';
import { styled, Toolbar, List, Typography, Divider, IconButton, Grid } from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AdminBar from './AdminBar';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from "react-i18next";
import Flag from 'react-world-flags';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function NavContent() {
  const [open, setOpen] = React.useState(true);
  const { user } = React.useContext(AuthContext);
  const [lang, setLang] = React.useState('en');
  const { t, i18n } = useTranslation();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onClickSetLanguageEN = (e: any) => {
    i18n.changeLanguage('en'); //change the language  
    setLang('en');
  }
  const onClickSetLanguageBG = (e: any) => {
    i18n.changeLanguage('bg'); //change the language  
    setLang('bg');
  }

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
  }


  return (
    <Grid item>
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {t('Dashboard')}
        </Typography>
        <Typography component={'h6'} variant='h6'>{user?.getEmail()}</Typography>
        {lang === 'en'
          ? <IconButton onClick={onClickSetLanguageBG}>
              <Flag code='BG' height='16' />
            </IconButton>
          : <IconButton onClick={onClickSetLanguageEN}>
              <Flag code='GB' height='16' />
            </IconButton>
        }

      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
      <Toolbar
      disableGutters={true}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography component={'h6'} variant='h6' align='center' mx={'auto'}>{t('Leaves App')}</Typography>
        <IconButton sx={{justifyContent: 'flex-end'}}
        onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <AdminBar />
      </List>
    </Drawer>
 </Grid>
  );
}

export default NavContent;