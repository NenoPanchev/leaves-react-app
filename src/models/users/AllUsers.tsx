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
import { IUserEdit } from '../interfaces/user/IUserEdit';
import { IUserFilter } from '../interfaces/user/IUserFilter';
import { useNavigate } from 'react-router-dom';
import ImportHistoryButton from "./ImportHistory";
import '../ViewAll.css';

export default function Users() {
  const [refreshCounter, setRefreshCounter] = React.useState(0);
  const [userFilter, setUserFilter] = React.useState<IUserFilter>(DEFAULT_USER_FILTER);
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const [departmentNames, setDepartmentNames] = React.useState<string[]>([]);
  const [roleNames, setRoleNames] = React.useState<string[]>([]);
  const [typeNames, setTypeNames] = React.useState<string[]>([]);

  const { t } = useTranslation();
  const page = userService.useFetchPage(refreshCounter, userFilter);
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
    // const page = userService.useFetchPage(refreshCounter, userFilter);

  }, [setTypeNames,setRoleNames,setDepartmentNames]);

  const redirectToContracts = (id: number) => {
    navigate(`/contracts/employee/${id}`);
  }

  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (user: IUserEdit, rowId: number) => {
    return <EditUserButton user={user} refreshCurrentState={refreshCounter} refresh={setRefreshCounter}
      departmentNames={departmentNames} roleNames={roleNames} typeNames={typeNames} rowId={rowId} apiRef={apiRef.current} />
  }

  const renderImportHistoryButton = (id: number) => {
    return <ImportHistoryButton id={id} refreshCurrentState={refreshCounter} refresh={setRefreshCounter}/>
  }

  const renderDeleteButton = (id: number, roles: string[], refreshCurrentState: number, refresh: (value: number) => void) => {
    if (roles.includes('SUPER_ADMIN')) {
      return <></>;
    }
    console.log(roles);
    
    console.log('Rendering delete button...');
    
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState}
      refresh={setRefreshCounter}></DeleteButton>
  }

  const myGridToolbarComponents = [
    <AddUserButton refreshCurrentState={refreshCounter} refresh={setRefreshCounter}
      departmentNames={departmentNames} roleNames={roleNames} typeNames={typeNames} />,
    <UserSearchFilter refreshCurrentState={refreshCounter} refresh={setRefreshCounter} roleNames={roleNames}
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
        renderImportHistoryButton(params.row.id), 
        renderDeleteButton(params.row.id, params.row.roles, refreshCounter, setRefreshCounter)
      ]
    },
  ];
  const rows = page.content.map((user) => {
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
        localeText={{
          toolbarColumns: t(`DataGridToolBar.Columns`)!,
          toolbarDensity: t(`DataGridToolBar.Density`)!,
          toolbarExport: t(`DataGridToolBar.Export`)!
        }}
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