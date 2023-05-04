import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApproveDialogAlerts from '../../components/Alert/ApproveDialogAlert';
import { DEFAULT_PAGE } from '../../constants/GlobalConstants';
import RequestService from '../../services/RequestService';
import IAlertProps from '../interfaces/errors/IAlertProps';
import Filter from '../interfaces/request/Filter';
import ILeaveRequestPage from '../interfaces/request/ILeaveRequestPage';
import IRequestDataGet from '../interfaces/request/IRequestDataGet';
import ApproveRequestDialog from './ApproveRequestDialog';
import ListAllFilter from './ListAllFilter';
const RequestsGrid: React.FC = (): JSX.Element => {
  const [rows, setRows] = useState<Array<GridRowsProp>>([]);
  const apiRef = useGridApiRef();
  const [t, i18n] = useTranslation();
  const [leaveRequestFilter, setLeaveRequestFilter] = useState<Filter>({
    id: [],
    dateCreated: [],
    createdBy: [],
    lastUpdated: [],
    startDate: [],
    endDate: [],
    approved: [],
    offset: 0,
    limit: 10,
    operation: "EQUAL",
    sort: "startDate",
    deleted: "false"
  });

  const [openForm, setOpen] = useState<boolean>(false);
  // const ChildMemo = React.memo(ApproveRequestDialog);

  const [page, setPage] = useState<ILeaveRequestPage>(DEFAULT_PAGE);
  useEffect(() => {
    retrivePage();
  }, [leaveRequestFilter, setOpen]);

  let numberOfElements = page.numberOfElements * (page.number + 1);


  const retrivePage = async () => {
    await RequestService.getAllFilterPage(leaveRequestFilter)
      .then((response: any) => {
        setPage(response.data);
        setRows(response.data.content)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const handleDeleteClick = (request: IRequestDataGet, rowId: any) => async () => {
    if (!request.deleted) {
      await RequestService.remove(request.id)
        .then((_response: any) => {
          apiRef.current.updateRows([{ id: rowId, _action: "delete" }]);
          numberOfElements = numberOfElements - 1;
          page.totalElements = page.totalElements - 1;
        })
        .catch((e: AxiosError<any, any>) => {
          if (e.response) {
            setAlertProps({ ...alertProps, message: e.response.data.message, hasError: true, open: true, type: e.response.data.type })
          }

        });
    }
  };

  const handleDisapproveClick = (request: IRequestDataGet, rowId: GridRowId) => async () => {
    if(request.approved!=null)
    {
      setAlertProps({ ...alertProps, message: "", hasError: true, open: true, type: "Approve" })
    }
    else
    {
      await RequestService.disapprove(request.id)
      .then((_response: any) => {
        apiRef.current.updateRows([{ id: rowId, approved: false }]);
      })
      .catch((e: AxiosError<any, any>) => {
        if (e.response) {
          setAlertProps({ ...alertProps, message: "", hasError: true, open: true, type: e.response.data.type })
        }
      });
    }
   
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    setAlertProps({ ...alertProps, message: "", hasError: false, open: false, type: "" })
    setLeaveRequestFilter({ ...leaveRequestFilter, offset: 0 })
  };
  function changeApproved(params: any) {

    if (params.row.approved === true) {
      return t('Requests.approved')
    }
    if (params.row.approved === false) {
      return t('Requests.Rejected')
    }

    if (params.row.approved === null) {
      console.log(params.row.approved)
      return t('Requests.notProcessed')
    }
  }

  const updateFilter = useCallback(

    (newValue: Filter): void => setLeaveRequestFilter(newValue),

    [setLeaveRequestFilter]


  );


  const [alertProps, setAlertProps] = useState<IAlertProps>(
    {
      hasError: false,
      message: "",
      type: "",
      open: false
    }
  );
  const updateAlertOpen = useCallback(
    (newValue: boolean): void => { setAlertProps({ ...alertProps, open: false }) }
    ,

    [setAlertProps]

  );
  const ListAllFilterProps = {
    onAdd: updateFilter,
    onSubmitChild: onSubmit,
    value: leaveRequestFilter
  }
  const AlertProps = {
    alertPropsChild: alertProps,
    onClose: updateAlertOpen
  }
  function CustomToolbar() {
    return (

      <GridToolbarContainer >
        <GridToolbarColumnsButton />
        <ApproveDialogAlerts {...AlertProps} />
        <ListAllFilter  {...ListAllFilterProps} />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>

    );
  }
  const updateAlertOpenFromChild = useCallback(
    (newValue: IAlertProps): void => { setAlertProps({ ...newValue }) }
    ,

    [setAlertProps]

  );
  function renderDeletedButtons(request: IRequestDataGet, rowId: any): JSX.Element {

    return (
      <GridActionsCellItem
        icon={<Tooltip title={t('delete')}><DeleteIcon /></Tooltip>}
        label="Delete"
        className="textPrimary"
        onClick={handleDeleteClick(request, rowId)}
        color="inherit"
      />
    );
  }

  const handlePaginationModelChange = (paginationModel: any) => {
    setLeaveRequestFilter({
      ...leaveRequestFilter, offset: paginationModel.pageSize * (paginationModel.page),
      limit: paginationModel.pageSize
    })
  };

  const columns: GridColDef[] = [
    {
      field: 'startDate',
      headerName: t(`Requests.StartDate`)!,
      flex: 0.45
    },
    {
      field: 'endDate',
      headerName: t(`Requests.EndDate`)!,
      flex: 0.45
    },
    {
      field: 'daysRequested',
      headerName: t(`Requests.daysRequested`)!,
      flex: 0.5
    },
    {
      field: 'approved',
      headerName: t(`Requests.Approved`)!,
      flex: 0.5,
      valueGetter: changeApproved
    },
    {
      field: 'createdBy',
      headerName: t(`CreatedBy`)!,
      flex: 0.5
    },
    {
      field: 'approvedStartDate',
      headerName: t(`Requests.approvedStartDate`)!,
      flex: 0.6
    },
    {
      field: 'approvedEndDate',
      headerName: t(`Requests.approvedEndDate`)!,
      flex: 0.6
    },
    {
      field: 'approve',
      type: 'actions',
      headerName: t(`Requests.Approve`)!,
      flex: 0.40,
      cellClassName: 'actions',
      getActions: ({ row, id }) => {
        return [
          <ApproveRequestDialog request={row} rowId={id} apiRef={apiRef.current} onClick={updateAlertOpenFromChild} />,
          <GridActionsCellItem
            icon={<Tooltip title={t('reject')}><CancelIcon /></Tooltip>}
            label="Reject"
            onClick={handleDisapproveClick(row, id)}
            color="inherit"
          />,
        ];
      },

    },
    {
      field: 'delete',
      type: 'actions',
      headerName: t(`delete`)!,
      flex: 0.40,
      cellClassName: 'actions',
      getActions: ({ row, id }) => {

        return [
          renderDeletedButtons(row, id)
        ];

      },
    },
  ];

  return (
    <Grid sx={{ width: '100%' }}>
      <DataGrid
        disableColumnMenu
        localeText={{
          toolbarColumns: t(`DataGridToolBar.Columns`)!,
          toolbarDensity: t(`DataGridToolBar.Density`)!,
          toolbarExport: t(`DataGridToolBar.Export`)!
        }}
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        slots={{ toolbar: CustomToolbar }}
        // loading={isLoading}
        rowCount={page.totalElements}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        paginationModel={{ page: page.number, pageSize: page.size }}
        pagination
        paginationMode='server'
        onPaginationModelChange={handlePaginationModelChange}
        sx={{
          '& .MuiDataGrid-virtualScroller': {
            overflow: "hidden"
          }
        }}
      />
    </Grid>
  )
};

export default RequestsGrid;
