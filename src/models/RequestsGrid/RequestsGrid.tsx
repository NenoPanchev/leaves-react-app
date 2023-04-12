import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RequestService from '../../services/RequestService';
import ListAllFilter from './ListAllFilter';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LimitDropDown from '../../components/CustomPaginationComponents/LimitDropdown';
import IAlertProps from '../interfaces/errors/IAlertProps';
import Filter from '../interfaces/request/Filter';
import ILeaveRequestPage from '../interfaces/request/ILeaveRequestPage';
import IRequestDataGet from '../interfaces/request/IRequestDataGet';
import ApproveDialogAlerts from '../../components/Alert/ApproveDialogAlert';
import ApproveRequestDialog from './ApproveRequestDialog';
const RequestsGrid: React.FC = (): JSX.Element => {
  const [rows, setRows] = useState<Array<GridRowsProp>>([]);
  const apiRef = useGridApiRef();
  const [t, i18n] = useTranslation();
  const [userFilter, setUserFilter] = useState<Filter>({
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
    sort: "id",
    deleted: "false"
  });
  const { id, dateCreated, createdBy, lastUpdated, startDate, endDate, approved, offset, limit, sort } = userFilter;
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpen] = useState<boolean>(false);
  // const ChildMemo = React.memo(ApproveRequestDialog);



  const [page, setPage] = useState<ILeaveRequestPage>({
    content: [],

    totalElements: 0,
    totalPages: 0,

    numberOfElements: 0,
    number: 0,

    first: true,
    last: true
  });
  useEffect(() => {
    retrivePage();
    console.log(openForm)
  }, [userFilter,setOpen]);

  let numberOfElements = page.numberOfElements * (page.number + 1);

  const updateFormOpen = React.useCallback(

    (newValue: boolean): void => setOpen(newValue),

    [setOpen]
);

  const retrivePage = async () => {
    await RequestService.getAllFilterPage(userFilter)
      .then((response: any) => {
        // setRows(response.data);
        console.log(response.data);
        console.log(response.data.content);
        setPage(response.data);
        setRows(response.data.content)
        setIsLoading(false)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  const handleApproveClick = (request: IRequestDataGet, rowId: GridRowId) => async () => {
    setOpen(true);
    // await RequestService.approve(request.id)
    //   .then((_response: any) => {
    //     apiRef.current.updateRows([{ id: rowId, approved: true }]);
    //   })
    //   .catch((e: AxiosError<any, any>) => {
    //     if (e.response) {
    //       console.log();
    //       setAlertProps({ ...alertProps, message: e.response.data.message, hasError: true, open: true, type: e.response.data.type })
    //       console.log(alertProps);
    //     }

    //   });
  };

  const handleDeleteClick = (request: IRequestDataGet, rowId: any) => async () => {
    await RequestService.remove(request.id)
      .then((_response: any) => {
        apiRef.current.updateRows([{ id: rowId, _action: "delete" }]);
        numberOfElements = numberOfElements - 1;
        page.totalElements = page.totalElements - 1;
      })
      .catch((e: AxiosError<any, any>) => {
        if (e.response) {
          console.log();
          setAlertProps({ ...alertProps, message: e.response.data.message, hasError: true, open: true, type: e.response.data.type })
          console.log(alertProps);
        }

      });
  };
  const handleVisionClickOnDeleted = (request: IRequestDataGet, rowId: any) => async () => {
    await RequestService.unMarkAsDeleted(request.id)
      .then((_response: any) => {

        if (userFilter.deleted === "true") {
          apiRef.current.updateRows([{ id: rowId, _action: "delete" }]);
          numberOfElements = numberOfElements - 1;
          page.totalElements = page.totalElements - 1;
        } else if (userFilter.deleted === "null") {
          request.isDeleted = false;
          apiRef.current.updateRows([{ id: rowId }]);
        }
      })
      .catch((e: AxiosError<any, any>) => {
        if (e.response) {
          console.log();
          setAlertProps({ ...alertProps, message: e.response.data.message, hasError: true, open: true, type: e.response.data.type })
          console.log(alertProps);
        }

      });
  };

  const handleDisapproveClick = (request: IRequestDataGet, rowId: GridRowId) => async () => {
    await RequestService.disapprove(request.id)
      .then((_response: any) => {
        apiRef.current.updateRows([{ id: rowId, approved: false }]);
      })
      .catch((e: AxiosError<any, any>) => {
        if (e.response) {
          setAlertProps({ ...alertProps, message: e.response.data.message, hasError: true, open: true, type: e.response.data.type })
        }
        console.log(alertProps);
        console.log(e);
      });
  };


  //search


  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setAlertProps({ ...alertProps, message: "", hasError: false, open: false, type: "" })
    setUserFilter({ ...userFilter, offset: 0 })
  };
  function changeApproved(params: any) {

    if (params.row.approved === true) {
      return t('Requests.approved')
    }
    if (params.row.approved === false) {
      return t('Requests.rejected')
    }

    if (params.row.approved === null) {
      console.log(params.row.approved)
      return t('Requests.notProcessed')
    }
  }
  function ModelChange(params: any) {

    userFilter.offset += userFilter.limit;
  }

  const updateFilter = useCallback(

    (newValue: Filter): void => setUserFilter(newValue),

    [setUserFilter]


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
    value: userFilter
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
    if (request.isDeleted) {

      return (
        <GridActionsCellItem
          icon={<Tooltip title={t('publish')}><VisibilityIcon /></Tooltip>}
          label="Publish"
          className="textPrimary"
          onClick={handleVisionClickOnDeleted(request, rowId)}
          color="inherit"
        />
      );
    } else {
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
  }

  const updateFilterLimit = useCallback(
    (newValue: number): void => setUserFilter({ ...userFilter, limit: newValue }),

    [setUserFilter]

  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 0.20
    },
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
          <ApproveRequestDialog request={row} rowId={id} apiRef={apiRef.current} onClick={updateAlertOpenFromChild}/>,
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
  const onPreviousPage = async () => {
    if (!page.first) {
      setUserFilter({ ...userFilter, offset: (userFilter.offset - userFilter.limit) })
    }
  };
  const onNextPage = async () => {
    if (!page.last) {
      setUserFilter({ ...userFilter, offset: (userFilter.offset + userFilter.limit) })
    }


  };
  const onFirstPage = async () => {
    if (!page.first) {
      setUserFilter({ ...userFilter, offset: 0 })
    }
  };
  const onLastPage = async () => {
    if (!page.last) {
      setUserFilter({ ...userFilter, offset: (limit * (page.totalPages - 1)) })
    }


  };

  const calculateElements = () => {
    if (!page.last) {
      return <Grid >{userFilter.offset + 1}-{numberOfElements} {t('of')} {page.totalElements}</Grid>
    } else {
      return <Grid >{userFilter.offset + 1}-{page.totalElements} {t('of')} {page.totalElements}</Grid>
    }


  };

  function CustomPagination() {
    return <Grid container direction={'row'} alignItems="center" >
      <Grid container justifyContent="left" marginTop={1} marginBottom={-7} marginLeft={1}>
        <Grid item > <LimitDropDown onChange={updateFilterLimit} value={userFilter.limit} /></Grid>
      </Grid>

      <Grid container justifyContent="right" marginBottom={2} marginTop={1}>
        <Grid item>{calculateElements()}
          {t('page')} {page.number + 1} {t('of')} {page.totalPages}
        </Grid>
        <Grid item marginRight={2}>
          <IconButton onClick={onFirstPage} ><FirstPageIcon /></IconButton>
          <IconButton onClick={onPreviousPage} ><NavigateBeforeIcon /></IconButton>
          <IconButton onClick={onNextPage} >< NavigateNextIcon /></IconButton>
          <IconButton onClick={onLastPage} >< LastPageIcon /></IconButton>
        </Grid>
      </Grid>

    </Grid>

  }

  return (

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
      slots={{ toolbar: CustomToolbar, pagination: CustomPagination }}
    // loading={isLoading}

    />
  )
};

export default RequestsGrid;
