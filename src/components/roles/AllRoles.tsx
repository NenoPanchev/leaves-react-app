import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MuiLink from '@mui/material/Link';
import { Box, Container } from '@mui/system';
import Title from '../common/Title';
import ViewButton from '../common/ViewButton';
import DeleteButton from '../common/DeleteButton';
import * as roleService from '../../services/roleService';
import './AllRoles.css'
import { useLocation } from 'react-router-dom';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type Role = {
  id: number,
  name: string,
  permissions: [{
    name: string
  }]
}

export default function Roles() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const roles = roleService.useFetchAll(refreshCurrentState);

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
                <TableCell>
                  <DeleteButton id={role.id} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}></DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      </Container>
    </React.Fragment>
  );
}