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
  const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
  const [serverError, setServerError] = React.useState<boolean>(false);
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,4}$/;

  let eError = false;
  let pError = false;
  let sError = false;
  let serverResponse = '';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let errors = validate(data);

    if (!errors) {
      serverResponse = await authenticate(data);
      setServerErrorMessage(serverResponse);
    }
    if (errors == validate(data)) {
      return;
    }
  };

  function validate(formData: FormData): boolean {
    const email: string = JSON.parse(JSON.stringify(formData.get('email')));
    const password: string = JSON.parse(JSON.stringify(formData.get('password')));
    setEmailError(!regex.test(email));
    eError = (!regex.test(email));
    setPasswordError(password.length < 4 || password.length > 20);
    pError = (password.length < 4 || password.length > 20);
    sError = serverResponse !== '';
    setServerError(serverResponse !== '');
    return eError || pError || sError;
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
            {serverError &&
              <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography>
            }
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
