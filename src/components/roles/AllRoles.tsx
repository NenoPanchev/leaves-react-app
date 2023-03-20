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
import * as roleService from '../../services/roleService';
import './AllRoles.css'



function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const baseUrl = 'http://localhost:8080/roles';
const jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckBhZG1pbi5jb20iLCJleHAiOjE2NzkzMzE2NzAsImlhdCI6MTY3OTI5NTY3MH0.BkPdZPYAGxve83WypcBnbL4rX9zfr-ij4uz5nKq1XcTh-VQJMdBh0CSEQbR9Ph6P9zpBVtepIBWX3eDB1GwK-g';
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

  // const [roles, setRoles] = useState<Role[]>([]);


  // useEffect(() => {
  //   loadRoles();
  // }, []);

  // const loadRoles = async () => {
  //   const result = await axios.get(baseUrl, withAuthHeader)
  //     .then(response => setRoles(response.data))
  //     .catch(error => console.log(error))
  // }
  const roles = roleService.GetAll();

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