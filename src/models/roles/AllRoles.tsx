import * as React from 'react';
import { Box, Container } from '@mui/system';
import Title from '../../components/common/Title';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as roleService from '../../services/roleService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IRole, IRoleFilter } from '../interfaces/role/roleInterfaces'
import { GridRowParams } from '@mui/x-data-grid';

import AddRoleButton from './AddRole';
import EditRoleButton from './EditRole';
import RoleSearchFilter from './RoleSearchFilter';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/GlobalConstants';

import '../ViewAll.css'
import { Grid } from '@mui/material';


export default function Roles() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [roleFilter, setRoleFilter] = React.useState<IRoleFilter>({
    name: '',
    permissions: [],
    offset: DEFAULT_OFFSET,
    limit: DEFAULT_LIMIT
  });

  const { t } = useTranslation();
  const page = roleService.useFetchPage(refreshCurrentState, roleFilter);
  

  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (role: IRole) => {  
    return <EditRoleButton role={role} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}/>
  }

  const renderDeleteButton = (id: number) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState} 
    refresh={setRefreshCurrentState}></DeleteButton>
  }

  const handlePaginationModelChange = (paginationModel:any) => {
    setRoleFilter({...roleFilter, offset: paginationModel.pageSize * (paginationModel.page), 
        limit: paginationModel.pageSize})
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
      id: role.id, name: role.name, permissions: role.permissions.map(p => p.name).join(', ')
    }
  });

  return (
    <React.Fragment>
      <Grid sx={{width: '97%', marginLeft: 'auto', marginRight: 'auto'}}>
        <Title>{t('Roles')}</Title>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <RoleSearchFilter refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} 
          filter={roleFilter} setFilter={setRoleFilter}></RoleSearchFilter>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddRoleButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} />
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
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
          />
        </Box>
      </Grid>
    </React.Fragment>
  );
}