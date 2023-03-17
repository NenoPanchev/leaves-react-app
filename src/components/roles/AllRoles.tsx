import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MuiLink from '@mui/material/Link';
import { Box, Container } from '@mui/system';
import Title from '../common/Title';
import ViewButton from '../common/ViewButton';
import './AllRoles.css'



function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const baseUrl = 'http://localhost:8080/roles';
const jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckBhZG1pbi5jb20iLCJleHAiOjE2NzkwNzMzNjMsImlhdCI6MTY3OTAzNzM2M30.ed85L0RTIMffrm7w6JbxkfhZkHzR-nQr2-jZNanVnStuuCWOL6wlrNn5DyzUh-CbQlnecgGY5FGdHLCNiWTfBQ';
const withAuthHeader = {
  headers: {
    'Content-Type': 'aplication/json',
    'Authorization': 'Bearer ' + jwt
  }
}
type Role = {
  id: number,
  name: string,
  permissions: [{
    name: string
  }]
}

export default function Roles() {

  const [roles, setRoles] = useState<Role[]>([]);


  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const result = await axios.get(baseUrl, withAuthHeader)
      .then(response => setRoles(response.data))
      .catch(error => console.log(error))
  }

  console.log(roles);

  return (
    <React.Fragment>
      <Container >
        <Title>Roles</Title>
        <Box
          sx={{
            marginTop: 3,
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white'
          }}
        >
        <Table size="small" style={{borderRadius: '5'}}>
          <TableHead style={{backgroundColor: '#b1c900'}}>
            <TableRow className='tableHeader'>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell></TableCell>
              <TableCell>Actions</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.map(p => p.name).join(', ')}</TableCell>
                <TableCell>
                  <ViewButton id={role.id}></ViewButton>
                </TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      </Container>
    </React.Fragment>
  );
}