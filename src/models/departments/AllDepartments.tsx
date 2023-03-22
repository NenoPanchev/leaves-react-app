import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/system';
import Title from '../../components/common/Title';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as departmentService from '../../services/departmentService';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import '../ViewAll.css'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


export default function Departments() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const departments = departmentService.useFetchAll(refreshCurrentState);

  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void ) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}></DeleteButton>
  }
  
  const 

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'admin',
      headerName: 'Admin',
      width: 150,
    },
    {
      field: 'employees',
      headerName: 'Employees',
      renderCell: (params) => renderEmployeeEmails(),
      width: 200,
    },
    {
      field: 'views',
      renderCell: (params) => renderViewButton(params.row.id),
      headerName: '',
      width: 110,
    },
    {
      field: 'edit',
      headerName: 'Actions',
      width: 110,
    },
    {
      field: 'delete',
      renderCell: (params) => renderDeleteButton(params.row.id, refreshCurrentState, setRefreshCurrentState),
      headerName: '',
      width: 110,
    },

  ];

  
  
  const rows = departments.map(dpt => {
    return {
      id: dpt.id, name: dpt.name, admin: dpt.adminEmail, employees: dpt.employeeEmails ? dpt.employeeEmails.join("\n") : '',
      actions: renderViewButton(dpt.id), edit: '', delete: renderDeleteButton(dpt.id, refreshCurrentState, setRefreshCurrentState)
    }
  });


  return (
    <React.Fragment>
      <Container >
        <Title>Departments</Title>
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
      </Container>
    </React.Fragment>
  );
}