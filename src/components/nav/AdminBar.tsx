import { Link, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader, Grid } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import AdminBarLoggedIn from './AdminBarLoggedIn';


const AdminBar = () => {
  const currentLocation = useLocation();
  const { t } = useTranslation();
  const loggedIn = localStorage.getItem('Authenticated') == 'true';

  if (!loggedIn) {
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
            selected={currentLocation.pathname === '/login' ? true : false}>
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