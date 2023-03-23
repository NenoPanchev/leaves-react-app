import * as React from 'react';
import { Box, Container } from '@mui/system';
import Title from '../../components/common/Title';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as userService from '../../services/userService';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddUserButton from './AddUser';
import '../ViewAll.css'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Users() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const users = userService.useFetchAll(refreshCurrentState);

  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}></DeleteButton>
  }

  

  const columns: GridColDef[] = [
    { field: 'id',
      headerName: 'ID',
      headerClassName: 'grid-header',
      width: 70,
      
    },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'grid-header',
      width: 150,
      flex: 1, 
    },
    {
        field: 'email',
        headerName: 'Email',
        headerClassName: 'grid-header',
        width: 150,
        flex: 1, 
      },
      {
        field: 'department',
        headerName: 'Department',
        headerClassName: 'grid-header',
        width: 150,
        flex: 1, 
      },
    {
      field: 'roles',
      headerName: 'Roles',
      headerClassName: 'grid-header',
      width: 200,
      flex: 1, 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'grid-header',
      type: 'actions',
      width: 120,
      flex: 1, 
      getActions: (params) => [
        renderViewButton(params.row.id),
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"      
        />,
        renderDeleteButton(params.row.id, refreshCurrentState, setRefreshCurrentState)
      ]
    },
  ];

  const rows = users.map(user => {
    return {
      id: user.id, name: user?.name, email: user.email, department: user?.department, roles: user.roles.map(role => role.name).join(', '),
      actions: renderViewButton(user.id), edit: '', delete: renderDeleteButton(user.id, refreshCurrentState, setRefreshCurrentState)
    }
  });

  return (
    <React.Fragment>
      <Container >
        <Title>Users</Title>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <AddUserButton refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}/>
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