import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Table } from '@mui/material';
import { Label } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import './RoleView.css'

interface RoleViewProp {
    id: number
}

type Role = {
    id: number,
    name: string,
    permissions: [{
      name: string
    }]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
  }

const baseUrl = 'http://localhost:8080/roles/';
const jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckBhZG1pbi5jb20iLCJleHAiOjE2NzkwNzMzNjMsImlhdCI6MTY3OTAzNzM2M30.ed85L0RTIMffrm7w6JbxkfhZkHzR-nQr2-jZNanVnStuuCWOL6wlrNn5DyzUh-CbQlnecgGY5FGdHLCNiWTfBQ';
const withAuthHeader = {
  headers: {
    'Content-Type': 'aplication/json',
    'Authorization': 'Bearer ' + jwt
  }
}
  

export default function RoleView(props:RoleViewProp) {
    const theme = useTheme();
    const [role, setRole] = useState<Role>();
    const getFormattedDate = (dateStr:string) => {
        const date = new Date(dateStr);
        return date.toLocaleString;
    }
    const createdAtData = role?.createdAt;
    
  useEffect(() => {
    loadRoles();
  }, []);
  

  const loadRoles = async () => {
    const result = await axios.get(baseUrl + props.id, withAuthHeader)
      .then(response => setRole(response.data))
      .catch(error => console.log(error))
  }
  console.log(role);
//   const createdAtFormatted = getFormattedDate(role!.createdAt);
  

    return (
        <React.Fragment>
            <DialogTitle id="responsive-dialog-title">
                 {"Role Details"}
            </DialogTitle>
            <DialogContent className='dialog'>
            <Grid container direction={'row'}>
                <Card style={{width: '50%'}}>
                    <Table>
                        <TableRow>
                            <TableCell className='tableHeader' variant='head'>Id:</TableCell>
                            <TableCell>{role?.id}</TableCell>
                        </TableRow>
                    </Table>
                    <Typography>{"Id: " + role?.id}</Typography>
                    <Typography>{"Name: " + role?.name}</Typography>
                    <Typography>{"Permissions: " + role?.permissions.map(p => p.name).join(', ')}</Typography>
                </Card>
                <Card style={{width: '50%'}}>
                    <Typography>{"Created at: " + role?.createdAt}</Typography>
                    <Typography>{role?.createdBy}</Typography>
                    <Typography>{role?.lastModifiedAt}</Typography>
                    <Typography>{role?.lastModifiedBy}</Typography>
                </Card>
                
            </Grid>
            </DialogContent>
            
        </ React.Fragment>
    );
}