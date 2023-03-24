import * as React from 'react';

import { Container } from '@mui/system';
import Title from '../../components/common/Title';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as departmentService from '../../services/departmentService';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddDepartmentButton from './AddDepartment';
import EditDepartmentButton from './EditDepartment';
import { IDepartment } from '../interfaces//department/departmentInterfaces';
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

  const renderEditButton = (department: IDepartment) => {  
    return <EditDepartmentButton department={department} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}/>
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}></DeleteButton>
  }

  

  const columns: GridColDef[] = [
    { field: 'id',
      headerName: 'ID',
      headerClassName: 'grid-header',
      width: 70,
      
    },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'grid-header',
      width: 150,
      flex: 1, 
    },
    {
      field: 'admin',
      headerName: 'Admin',
      headerClassName: 'grid-header',
      width: 150,
      flex: 1, 
    },
    {
      field: 'employees',
      headerName: 'Employees',
      headerClassName: 'grid-header',
      // renderCell: (params) => renderEmployeeEmails(),
      width: 200,
      flex: 1, 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'grid-header',
      type: 'actions',
      width: 120,
      flex: 1, 
      getActions: (params) => [
        renderViewButton(params.row.id),
        renderEditButton(params.row),
        renderDeleteButton(params.row.id, refreshCurrentState, setRefreshCurrentState)
      ]
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
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddDepartmentButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}/>
        </Box>
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