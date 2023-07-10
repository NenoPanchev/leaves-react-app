import {Box} from '@mui/material';
import * as React from 'react';

export default function NotFound() {
    return (
        <React.Fragment>
           <Box sx={{backgroundColor: 'white', display: 'flex', justifyContent: 'center',height:'80%' ,width:'100%'}}>
            <img src="/404.jpg" alt="error-page" />
            </Box>
        </React.Fragment>
    )
}