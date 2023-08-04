import { Link, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader, Grid } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import AdminBarLoggedIn from './AdminBarLoggedIn';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';


const AdminBar = () => {
  const currentLocation = useLocation();
  const { t } = useTranslation();
  const loggedIn = localStorage.getItem('Authenticated') == 'true';
  const { user } = useContext(AuthContext);  

  if (!loggedIn || user?.getAuthorities === undefined) {
    return (
      <Grid sx={{overflow:"hidden"}} height="100%" width="100%">
        <ListSubheader component="div" inset>
          {t('Authentication')}
        </ListSubheader>

        <Link to={'/login'} style={{
          textDecoration: 'none',
          color: 'black'
        }}
        >
          <ListItemButton
            selected={currentLocation.pathname === '/login'}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={t('Login')} />
          </ListItemButton>
        </Link>
      </Grid>
    )
  }
  return (
    <AdminBarLoggedIn />
  )
}

export default AdminBar;