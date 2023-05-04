import * as React from 'react';
import ViewButton from '../../components/common/ViewButton';
import DeleteButton from '../../components/common/DeleteButton';
import * as contractService from '../../services/contractService';
import * as userService from '../../services/userService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import AddUserButton from './AddUser';
// import EditUserButton from './EditUser';
// import UserSearchFilter from './UserSearchFilter';
import { useTranslation } from 'react-i18next';
import { DEFAULT_CONTRACT_FILTER } from '../../constants/GlobalConstants';
import { Grid } from '@mui/material';
import CustomGridToolbar from '../../components/common/CustomGridToolbar';
import { IContractFilter } from '../interfaces/contract/IContractFilter';
import { useParams } from 'react-router-dom';
import '../ViewAll.css'
import { IContract } from '../interfaces/contract/IContract';
import EditContractButton from './EditContract';

export default function Contracts() {
    const [refreshCurrenter, setRefreshCounter] = React.useState(0);
    const [contractFilter, setContractFilter] = React.useState<IContractFilter>(DEFAULT_CONTRACT_FILTER);
    const typeNames = userService.useFetchAllTypeNames(refreshCurrenter);
    const { t } = useTranslation();
    let { id } = useParams();
    const page = contractService.useFetchPage(refreshCurrenter, contractFilter, Number(id));

    const renderViewButton = (id: number) => {
        return <ViewButton id={id}></ViewButton>
    }

      const renderEditButton = (contract: IContract) => {
        return <EditContractButton contract={contract} refreshCounter={refreshCurrenter} setRefreshCounter={setRefreshCounter}
          typeNames={typeNames} />
      }

    const renderDeleteButton = (id: number, refreshCurrentState: number, refresh: (value: number) => void) => {
        return <DeleteButton id={id} refreshCurrentState={refreshCurrentState}
            refresh={setRefreshCounter}></DeleteButton>
    }

    //   const myGridToolbarComponents = [
    //     <AddUserButton refreshCurrentState={refreshCurrenter} refresh={setRefreshCounter}
    //       departmentNames={departmentNames} roleNames={roleNames} typeNames={typeNames} />,
    //     <UserSearchFilter refreshCurrentState={refreshCurrenter} refresh={setRefreshCounter}
    //     filter={userFilter} setFilter={setUserFilter} typeNames={typeNames} departmentNames={departmentNames}/>
    // ]

    const handlePaginationModelChange = (paginationModel: any) => {
        setContractFilter({
            ...contractFilter, offset: paginationModel.pageSize * (paginationModel.page),
            limit: paginationModel.pageSize
        })
    };

    const columns: GridColDef[] = [
        {
            field: 'typeName',
            headerName: t('Position')!,
            headerClassName: 'grid-header',
            width: 150,
            flex: 0.5,
        },
        {
            field: 'startDate',
            headerName: t('Start date')!,
            headerClassName: 'grid-header',
            width: 150,
            flex: 0.5,
        },
        {
            field: 'endDate',
            headerName: t('End date')!,
            headerClassName: 'grid-header',
            width: 150,
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
                renderDeleteButton(params.row.id, refreshCurrenter, setRefreshCounter)
            ]
        },
    ];
    const rows = page.content.map((contract, index) => {
        return {
            key: contract.id, id: contract.id, typeName: contract.typeName, startDate: contract.startDate,
            endDate: contract.endDate
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
                slots={{ toolbar: () => <CustomGridToolbar components={[]} /> }}
                sx={{
                    '& .MuiDataGrid-virtualScroller': {
                        overflow: "hidden"
                    }
                }}
            />
        </Grid>
    );
}