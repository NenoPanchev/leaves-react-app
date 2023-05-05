import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import * as React from 'react';
import DeleteButton from '../../components/common/DeleteButton';
import ViewButton from '../../components/common/ViewButton';
import { getAllDepartmentNamesNoRefresh } from '../../services/departmentService';
import { getAllRoleNamesNoRefresh } from '../../services/roleService';
import * as userService from '../../services/userService';
import AddUserButton from './AddUser';
import EditUserButton from './EditUser';
import UserSearchFilter from './UserSearchFilter';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomGridToolbar from '../../components/common/CustomGridToolbar';
import { DEFAULT_USER_FILTER } from '../../constants/GlobalConstants';
import AuthContext from '../../contexts/AuthContext';
import TypeService from '../../services/TypeService';
import '../ViewAll.css';
import { IUserEdit } from '../interfaces/user/IUserEdit';
import { IUserFilter } from '../interfaces/user/IUserFilter';

export default function Users() {
  const [refreshCurrenter, setRefreshCounter] = React.useState(0);
  const [userFilter, setUserFilter] = React.useState<IUserFilter>(DEFAULT_USER_FILTER);

  const { user } = React.useContext(AuthContext);
  
  const [departmentNames, setDepartmentNames] = React.useState<string[]>([]);
  const [roleNames, setRoleNames] = React.useState<string[]>([]);
  const [typeNames, setTypeNames] = React.useState<string[]>([]);

  const { t } = useTranslation();
  const page = userService.useFetchPage(refreshCurrenter,userFilter);
  const apiRef = useGridApiRef();

  React.useEffect(() => {

    TypeService.getAllTypeNames()
      .then((response) => {
        setTypeNames(response.data)
      })
      .catch(error => console.log(error));

     getAllDepartmentNamesNoRefresh()
      .then((response) => {
        setDepartmentNames(response.data)
      })
      .catch(error => console.log(error));

      getAllRoleNamesNoRefresh()
       .then((response) => {
        setRoleNames(response.data)
      })
      .catch(error => console.log(error))
  // const page = userService.useFetchPage(refreshCurrenter, userFilter);

  }, [setTypeNames,setRoleNames,setDepartmentNames]);

  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (user: IUserEdit, rowId: number) => {
    return <EditUserButton user={user} refreshCurrentState={refreshCurrenter} refresh={setRefreshCounter}
      departmentNames={departmentNames} roleNames={roleNames} typeNames={typeNames} rowId={rowId} apiRef={apiRef.current} />
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState}
      refresh={setRefreshCounter}></DeleteButton>
  }

  const myGridToolbarComponents = [
    <AddUserButton refreshCurrentState={refreshCurrenter} refresh={setRefreshCounter}
      departmentNames={departmentNames} roleNames={roleNames} typeNames={typeNames} />,
    <UserSearchFilter roleNames={roleNames} refreshCurrentState={refreshCurrenter} refresh={setRefreshCounter}
      filter={userFilter} setFilter={setUserFilter} typeNames={typeNames} departmentNames={departmentNames} />]

  const handlePaginationModelChange = (paginationModel: any) => {
    setUserFilter({
      ...userFilter, offset: paginationModel.pageSize * (paginationModel.page),
      limit: paginationModel.pageSize
    })
  };

  const columns: GridColDef[] = [
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
        renderEditButton(params.row, params.row.id),
        renderDeleteButton(params.row.id, refreshCurrenter, setRefreshCounter)
      ]
    },
  ];
  const rows = page.content.map((user, index) => {
    return {
      key: user.id, id: user.id, name: user?.name, email: user.email, department: user.department,
      roles: user.roles.map(role => role.name).join(', '), contractStartDate: user.employeeInfo.contractStartDate,
      position: user.employeeInfo.typeName, daysLeave: user.employeeInfo.daysLeave
    }
  });

  return (
    <Grid sx={{ width: '100%' }}>
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