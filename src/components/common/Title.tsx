
import { Typography } from '@mui/material';
import * as React from 'react';

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom
    mt={5}>
      {props.children}
    </Typography>
  );
}