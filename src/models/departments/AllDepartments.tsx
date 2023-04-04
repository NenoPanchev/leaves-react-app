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
import DepartmentSearchFilter from './DepartmentSearchFilter';
import { useFetchAllEmails as fetchUserEmails } from '../../services/userService';
import { useTranslation } from 'react-i18next';

import '../ViewAll.css'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


export default function Departments() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [filteredDepartments, setFilteredDepartments] = React.useState<IDepartment[]>([]);
  const [filter, setFilter] = React.useState<FormData>(new FormData);
  const [shouldFilter, setShouldFilter] = React.useState<boolean>(false);
  const departments = departmentService.useFetchAllOrFiltered(refreshCurrentState, filter, shouldFilter);
  const userEmails = fetchUserEmails(refreshCurrentState);
  const { t } = useTranslation();
  const name = t('Name');
  const id = t('Id');
  const admin = t('Admin');
  const employees = t('Employees');
  const actions = t('Actions');
  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (department: IDepartment) => {  
    return <EditDepartmentButton department={department} refreshCurrentState={refreshCurrentState} 
    refresh={setRefreshCurrentState} userEmails={userEmails}/>
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState} 
    refresh={setRefreshCurrentState}></DeleteButton>
  }

  

  const columns: GridColDef[] = [
    { field: 'id',
      headerName: id,
      headerClassName: 'grid-header',
      width: 70,
      
    },
    {
      field: 'name',
      headerName: name,
      headerClassName: 'grid-header',
      width: 150,
      flex: 1, 
    },
    {
      field: 'adminEmail',
      headerName: admin,
      headerClassName: 'grid-header',
      width: 150,
      flex: 1, 
    },
    {
      field: 'employeeEmailss',
      headerName: employees,
      headerClassName: 'grid-header',
      // renderCell: (params) => renderEmployeeEmails(),
      width: 200,
      flex: 1, 
    },
    {
      field: 'actions',
      headerName: actions,
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
      id: dpt.id, name: dpt.name, adminEmail: dpt.adminEmail, 
      employeeEmails: dpt.employeeEmails ? dpt.employeeEmails.join("\n") : ''
    }
  });


  return (
    <React.Fragment>
      <Container >
        <Title>{t('Departments')}</Title>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <DepartmentSearchFilter refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} 
          setRoles={setFilteredDepartments} setFilter={setFilter}
          setShouldFilter={setShouldFilter}></DepartmentSearchFilter>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddDepartmentButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
          userEmails={userEmails}/>
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