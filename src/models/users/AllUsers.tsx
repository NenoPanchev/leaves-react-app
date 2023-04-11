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
import { IUser, IUserEdit as IUserEdit, IUserFilter } from '../interfaces/user/userInterfaces';

import '../ViewAll.css'
import { useTranslation } from 'react-i18next';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/GlobalConstants';

export default function Users() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [userFilter, setUserFilter] = React.useState<IUserFilter>({
    name: '',
    email: '',
    department: '',
    roles: [],
    offset: DEFAULT_OFFSET,
    limit: DEFAULT_LIMIT
  });
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

  const page = userService.useFetchPage(refreshCurrentState, userFilter);

  
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

  const handlePaginationModelChange = (paginationModel:any) => {
    setUserFilter({...userFilter, offset: paginationModel.pageSize * (paginationModel.page), 
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

  const rows = page.content.map(user => {
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
          filter={userFilter} setFilter={setUserFilter}
          ></UserSearchFilter>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddUserButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} 
          departmentNames={departmentNames} roleNames={roleNames}/>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
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