import * as React from 'react';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as departmentService from '../../services/departmentService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddDepartmentButton from './AddDepartment';
import EditDepartmentButton from './EditDepartment';
import { IDepartment } from '../interfaces/department/IDepartment';
import DepartmentSearchFilter from './DepartmentSearchFilter';
import { getAllEmailsNotHook, useFetchEmailsOfAvailableEmployees as fetchAvailableEmployeesEmails } from '../../services/userService';
import { useTranslation } from 'react-i18next';

import { DEFAULT_DEPARTMENT_FILTER } from '../../constants/GlobalConstants';
import { Grid } from '@mui/material';
import CustomGridToolbar from '../../components/common/CustomGridToolbar';
import { IDepartmentFilter } from '../interfaces/department/IDepartmentFilter';
import '../ViewAll.css'


export default function Departments() {
  const [refreshCurrentState, setRefreshCurrentState] = React.useState(0);
  const [departmentFilter, setDepartmentFilter] = React.useState<IDepartmentFilter>(DEFAULT_DEPARTMENT_FILTER);
  const [userEmails,setUserEmails] = React.useState<string[]>([]);
  const availableEmployeesEmails = fetchAvailableEmployeesEmails(refreshCurrentState);
  const page = departmentService.useFetchPage(refreshCurrentState, departmentFilter);
  const { t } = useTranslation();
  const [notLoaded] = React.useState<boolean>(true);
  React.useEffect(() => {
  const controller = new AbortController();
  if(notLoaded) {
    getAllEmailsNotHook(controller) 
    .then((response: any) => {
      setUserEmails(response.data)
    })
    .catch((e: Error) => {
      console.log(e);
    });

  }
   
       
        return () => controller.abort();
  }, []);

  const renderViewButton = (id: number) => {
    return <ViewButton id={id}></ViewButton>
  }

  const renderEditButton = (department: IDepartment) => {
    return <EditDepartmentButton department={department} refreshCurrentState={refreshCurrentState}
      refresh={setRefreshCurrentState} userEmails={userEmails} availableEmployeesEmails={availableEmployeesEmails} />
  }

  const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
    return <DeleteButton id={id} refreshCurrentState={refreshCurrentState}
      refresh={setRefreshCurrentState}></DeleteButton>
  }

  const myGridToolbarComponents = [
    <AddDepartmentButton key={'addButton'} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
      userEmails={userEmails} availableEmployeesEmails={availableEmployeesEmails} />,
      <DepartmentSearchFilter key={'searchFilter'} refreshCurrentState={refreshCurrentState} refresh={setRefreshCurrentState}
      filter={departmentFilter} setFilter={setDepartmentFilter} allEmails={userEmails}/>]

  const handlePaginationModelChange = (paginationModel: any) => {
    setDepartmentFilter({
      ...departmentFilter, offset: paginationModel.pageSize * (paginationModel.page),
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
      field: 'adminEmail',
      headerName: t('Admin')!,
      headerClassName: 'grid-header',
      width: 150,
      flex: 1,
    },
    {
      field: 'employeeEmails',
      headerName: t('Employees')!,
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
      getActions: (params) => [
        renderViewButton(params.row.id),
        renderEditButton(params.row),
        renderDeleteButton(params.row.id, refreshCurrentState, setRefreshCurrentState)
      ]
    },
  ];



  const rows = page.content.map(dpt => {
    return {
      key: dpt.id,
      id: dpt.id, name: dpt.name, adminEmail: dpt.adminEmail,
      employeeEmails: dpt.employeeEmails ? dpt.employeeEmails.join(", \n") : ''
    }
  });


  return (
    <React.Fragment>
      <Grid sx={{ width: '100%'}}>
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
    </React.Fragment>
  );
}