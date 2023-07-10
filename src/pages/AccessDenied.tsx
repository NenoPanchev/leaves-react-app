import {Box} from '@mui/material';
import * as React from 'react';

export default function AccessDenied() {
    return (
        <React.Fragment>
           <Box sx={{backgroundColor: 'white', display: 'flex', justifyContent: 'center',height:'80%' ,width:'100%'}}>
            <img src="/403.png" alt="403-page" />
            </Box>
        </React.Fragment>
    )
}