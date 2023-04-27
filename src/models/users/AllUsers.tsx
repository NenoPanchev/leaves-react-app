import * as React from 'react';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as userService from '../../services/userService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddUserButton from './AddUser';
import EditUserButton from './EditUser';
import UserSearchFilter from './UserSearchFilter';
import { useFetchAllNames as fetchDepartmentNames } from '../../services/departmentService';
import { useFetchAllNames as fetchRoleNames } from '../../services/roleService';

import { useTranslation } from 'react-i18next';
import { DEFAULT_USER_FILTER } from '../../constants/GlobalConstants';
import { Grid } from '@mui/material';
import CustomGridToolbar from '../../components/common/CustomGridToolbar';
import { ReactNode } from 'react';
import { IUserEdit } from '../interfaces/user/IUserEdit';
import { IUserFilter } from '../interfaces/user/IUserFilter';
import '../ViewAll.css'

export default function Users() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [userFilter, setUserFilter] = React.useState<IUserFilter>(DEFAULT_USER_FILTER);
  const departmentNames = fetchDepartmentNames(refreshCurrentState);
  const roleNames = fetchRoleNames(refreshCurrentState);
  const typeNames = userService.useFetchAllTypeNames(refreshCurrentState);
  const { t } = useTranslation();
  const page = userService.useFetchPage(refreshCurrentState, userFilter);
  const navBarHeight = localStorage.getItem('navBarHeight')!;


  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (user: IUserEdit) => {
    return <EditUserButton user={user} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
      departmentNames={departmentNames} roleNames={roleNames} typeNames={typeNames} />
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState}
      refresh={setRefreshCurrentState}></DeleteButton>
  }

  const myGridToolbarComponents = [
    <AddUserButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
      departmentNames={departmentNames} roleNames={roleNames} typeNames={typeNames} />]

  const handlePaginationModelChange = (paginationModel: any) => {
    setUserFilter({
      ...userFilter, offset: paginationModel.pageSize * (paginationModel.page),
      limit: paginationModel.pageSize
    })
    setRefreshCurrentState(refreshCurrentState + 1);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('Id')!,
      headerClassName: 'grid-header',
      width: 70,

    },
    {
      field: 'name',
      headerName: t('Name')!,
      headerClassName: 'grid-header',
      width: 150,
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: t('Email')!,
      headerClassName: 'grid-header',
      width: 150,
      flex: 1,
    },
    {
      field: 'department',
      headerName: t('Department')!,
      headerClassName: 'grid-header',
      width: 150,
      flex: 1,
    },
    {
      field: 'roles',
      headerName: t('Roles')!,
      headerClassName: 'grid-header',
      width: 200,
      flex: 1,
    },
    {
      field: 'contractStartDate',
      headerName: t('Start date')!,
      headerClassName: 'grid-header',
      width: 150,
      flex: 0.5,
    },
    {
      field: 'position',
      headerName: t('Position')!,
      headerClassName: 'grid-header',
      width: 150,
      flex: 0.5,
    },
    {
      field: 'daysLeave',
      headerName: t('Paid leave')!,
      headerClassName: 'grid-header',
      width: 70,
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: t('Actions')!,
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
      key: user.id,
      id: user.id, name: user?.name, email: user.email, department: user.department,
      roles: user.roles.map(role => role.name).join(', '), contractStartDate: user.employeeInfo.contractStartDate,
      position: user.employeeInfo.typeName, daysLeave: user.employeeInfo.daysLeave
    }
  });

  return (
    <Grid sx={{ width: '99.9%', height: `calc(100% - ${navBarHeight})` }}>
      <Grid container direction={'row'}>
        <UserSearchFilter refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
          filter={userFilter} setFilter={setUserFilter}
        ></UserSearchFilter>
      </Grid>
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
        disableColumnMenu
        slots={{ toolbar: () => <CustomGridToolbar components={myGridToolbarComponents} /> }}
        sx={{
          '& .MuiDataGrid-virtualScroller': {
            overflow: "hidden"
          }
        }}
      />
    </Grid>
  );
}