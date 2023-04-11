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
import { IDepartment, IDepartmentFilter } from '../interfaces//department/departmentInterfaces';
import DepartmentSearchFilter from './DepartmentSearchFilter';
import { useFetchAllEmails as fetchUserEmails } from '../../services/userService';
import { useFetchEmailsOfAvailableEmployees as fetchAvailableEmployeesEmails } from '../../services/userService';
import { useTranslation } from 'react-i18next';

import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/GlobalConstants';
import '../ViewAll.css'


export default function Departments() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [departmentFilter, setDepartmentFilter] = React.useState<IDepartmentFilter>({
    name: '',
    adminEmail: '',
    employeeEmails: [],
    offset: DEFAULT_OFFSET,
    limit: DEFAULT_LIMIT
  });
  const [filteredDepartments, setFilteredDepartments] = React.useState<IDepartment[]>([]);
  const [filter, setFilter] = React.useState<FormData>(new FormData);
  const [shouldFilter, setShouldFilter] = React.useState<boolean>(false);
  const departments = departmentService.useFetchAllOrFiltered(refreshCurrentState, filter, shouldFilter);
  const userEmails = fetchUserEmails(refreshCurrentState);
  const availableEmployeesEmails = fetchAvailableEmployeesEmails(refreshCurrentState);
  const page = departmentService.useFetchPage(refreshCurrentState, departmentFilter);
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
    refresh={setRefreshCurrentState} userEmails={userEmails} availableEmployeesEmails={availableEmployeesEmails}/>
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState} 
    refresh={setRefreshCurrentState}></DeleteButton>
  }

  const handlePaginationModelChange = (paginationModel:any) => {
    setDepartmentFilter({...departmentFilter, offset: paginationModel.pageSize * (paginationModel.page), 
        limit: paginationModel.pageSize})
    setRefreshCurrentState(refreshCurrentState + 1);  
  };

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
      field: 'employeeEmails',
      headerName: employees,
      headerClassName: 'grid-header',
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



  const rows = page.content.map(dpt => {
    return {
      id: dpt.id, name: dpt.name, adminEmail: dpt.adminEmail, 
      employeeEmails: dpt.employeeEmails ? dpt.employeeEmails.join(", \n") : ''
    }
  });


  return (
    <React.Fragment>
      <Container >
        <Title>{t('Departments')}</Title>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <DepartmentSearchFilter refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} 
          setDepartments={setFilteredDepartments} filter={departmentFilter} setFilter={setDepartmentFilter}
          ></DepartmentSearchFilter>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddDepartmentButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
          userEmails={userEmails} availableEmployeesEmails={availableEmployeesEmails}/>
        </Box>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={page.totalElements}
            pagination
            pageSizeOptions={[5, 10, 25, 50, 100]}
            paginationModel={{ page: page.number, pageSize: page.size }}
            paginationMode='server'
            onPaginationModelChange={handlePaginationModelChange}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}