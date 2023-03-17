import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align='center' > 
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/" align='center'>
      Leaves CRUD React App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     minHeight: '87vh',
    //   }}
    // >
      // <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          bottom: 0,
          
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    // </Box>
  );
}