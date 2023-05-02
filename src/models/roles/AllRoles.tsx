import * as React from 'react';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as roleService from '../../services/roleService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridRowParams } from '@mui/x-data-grid';
import AddRoleButton from './AddRole';
import EditRoleButton from './EditRole';
import RoleSearchFilter from './RoleSearchFilter';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ROLE_FILTER } from '../../constants/GlobalConstants';

import { Grid } from '@mui/material';
import CustomGridToolbar from '../../components/common/CustomGridToolbar';
import { IRole } from '../interfaces/role/IRole';
import { IRoleFilter } from '../interfaces/role/IRoleFilter';
import '../ViewAll.css'


export default function Roles() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [roleFilter, setRoleFilter] = React.useState<IRoleFilter>(DEFAULT_ROLE_FILTER);

  const { t } = useTranslation();
  const page = roleService.useFetchPage(refreshCurrentState, roleFilter);
  const navBarHeight = localStorage.getItem('navBarHeight')!;



  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (role: IRole) => {
    return <EditRoleButton role={role} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} />
  }

  const renderDeleteButton = (id: number) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState}
      refresh={setRefreshCurrentState}></DeleteButton>
  }

  const myGridToolbarComponents = [
    <AddRoleButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} />
  ]

  const handlePaginationModelChange = (paginationModel: any) => {
    setRoleFilter({
      ...roleFilter, offset: paginationModel.pageSize * (paginationModel.page),
      limit: paginationModel.pageSize
    })
    setRefreshCurrentState(refreshCurrentState + 1);
  };


  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name')!,
      headerClassName: 'grid-header',
      width: 150,
      flex: 1,
    },
    {
      field: 'permissions',
      headerName: t('Permissions')!,
      headerClassName: 'grid-header',
      width: 200,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: t('Actions')!,
      headerClassName: 'grid-header',
      type: 'actions',
      width: 120,
      flex: 1,
      getActions: (params: GridRowParams<IRole>) => [

        renderViewButton(params.row.id),
        renderEditButton(params.row),
        renderDeleteButton(params.row.id)

      ]
    },
  ];

  const rows = page.content.map(role => {
    return {
      key: role.id, id: role.id, name: role.name, permissions: role.permissions.map(p => p.name).join(', ')
    }
  });

  return (
    <React.Fragment>
      <Grid sx={{ width: '100%', height: `calc(100% - ${navBarHeight})` }}>
        <Grid container direction={'row'}>
          <RoleSearchFilter refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
            filter={roleFilter} setFilter={setRoleFilter}></RoleSearchFilter>
        </Grid>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={page.totalElements}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          paginationModel={{ page: page.number, pageSize: page.size }}
          pagination
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
    </React.Fragment>
  );
}