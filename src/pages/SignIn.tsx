import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as authService from '../services/authService';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

export default function SignIn() {
  const authenticate = authService.useLogin();
  const { t } = useTranslation();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  var regex = new RegExp('^[a-zA-Z0-9\.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$');
  let eError = false;
  let pError = false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const errors = validate(data);
    
    if (!errors) {
      authenticate(data);
    }
  };

  function validate(formData: FormData): boolean {
    const email:string = JSON.parse(JSON.stringify(formData.get('email')));
    const password:string = JSON.parse(JSON.stringify(formData.get('password')));
      setEmailError(!regex.test(email));
      eError = (!regex.test(email));
      setPasswordError(password.length < 4 || password.length > 20);
      pError = (password.length < 4 || password.length > 20);
      
    return eError || pError;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('Sign in')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('Email Address')}
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError ? t('Enter valid email!') : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('Password')}
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError ? t('Password must be between 4 and 20 characters') : null}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('Sign in')}
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
