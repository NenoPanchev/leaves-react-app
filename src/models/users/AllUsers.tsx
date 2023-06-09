import * as React from 'react';
import { Box, Container } from '@mui/system';
import Title from '../../components/common/Title';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as userService from '../../services/userService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddUserButton from './AddUser';
import EditUserButton from './EditUser';
import UserSearchFilter from './UserSearchFilter';
import { useFetchAllNames as fetchDepartmentNames } from '../../services/departmentService';
import { useFetchAllNames as fetchRoleNames } from '../../services/roleService';
import { IUser, IUserEdit as IUserEdit } from '../interfaces/user/userInterfaces';

import '../ViewAll.css'
import { useTranslation } from 'react-i18next';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


export default function Users() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>([]);
  const [filter, setFilter] = React.useState<FormData>(new FormData);
  const [shouldFilter, setShouldFilter] = React.useState<boolean>(false);
  const users = userService.useFetchAllOrFiltered(refreshCurrentState, filter, shouldFilter);
  const departmentNames = fetchDepartmentNames(refreshCurrentState);
  const roleNames = fetchRoleNames(refreshCurrentState);
  const { t } = useTranslation();
  const name = t('Name');
  const id = t('Id');
  const email = t('Email');
  const department = t('Department');
  const roles = t('Roles');
  const actions = t('Actions');

  
  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (user: IUserEdit) => {  
    return <EditUserButton user={user} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
    departmentNames={departmentNames} roleNames={roleNames}/>
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
        field: 'email',
        headerName: email,
        headerClassName: 'grid-header',
        width: 150,
        flex: 1, 
      },
      {
        field: 'department',
        headerName: department,
        headerClassName: 'grid-header',
        width: 150,
        flex: 1, 
      },
    {
      field: 'roles',
      headerName: roles,
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

  const rows = users.map(user => {
    return {
      id: user.id, name: user?.name, email: user.email, department: user.department, 
      roles: user.roles.map(role => role.name).join(', ')
    }
  });

  return (
    <React.Fragment>
      <Container >
        <Title>{t('Users')}</Title>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <UserSearchFilter refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} 
          setUsers={setFilteredUsers} setFilter={setFilter}
          setShouldFilter={setShouldFilter}></UserSearchFilter>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddUserButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} 
          departmentNames={departmentNames} roleNames={roleNames}/>
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