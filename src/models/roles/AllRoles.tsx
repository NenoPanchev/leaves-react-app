import * as React from 'react';
import { Box, Container } from '@mui/system';
import Title from '../../components/common/Title';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as roleService from '../../services/roleService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IRole } from '../interfaces/role/roleInterfaces'
import { GridRowParams } from '@mui/x-data-grid';

import AddRoleButton from './AddRole';
import EditRoleButton from './EditRole';
import RoleSearchFilter from './RoleSearchFilter';
import { useTranslation } from 'react-i18next';

import '../ViewAll.css'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


export default function Roles() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [filteredRoles, setFilteredRoles] = React.useState<IRole[]>([]);
  const [filter, setFilter] = React.useState<FormData>(new FormData);
  const [shouldFilter, setShouldFilter] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const name = t('Name');
  const id = t('Id');
  const permissions = t('Permissions');
  const actions = t('Actions');

  const roles = roleService.useFetchAllOrFiltered(refreshCurrentState, filter, shouldFilter);

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



  const columns: GridColDef[] = [
    {
      field: 'id',
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
      field: 'permissions',
      headerName: permissions,
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
      getActions: (params: GridRowParams<IRole>) => [
        
        renderViewButton(params.row.id),
        renderEditButton(params.row),
        renderDeleteButton(params.row.id)

      ]
    },
  ];

  const rows = roles.map(role => {
    return {
      id: role.id, name: role.name, permissions: role.permissions.map(p => p.name).join(', ')
    }
  });

  return (
    <React.Fragment>
      <Container >
        <Title>{t('Roles')}</Title>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <RoleSearchFilter refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} 
          setRoles={setFilteredRoles} setFilter={setFilter}
          setShouldFilter={setShouldFilter}></RoleSearchFilter>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddRoleButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState} />
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