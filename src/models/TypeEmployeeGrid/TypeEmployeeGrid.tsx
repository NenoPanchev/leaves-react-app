import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, useGridApiRef } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import TypeService from "../../services/TypeService";

import AddType from "./AddType";
import ListAllTypeFilter from "./ListAllTypeFilters";
import RemoveType from "./RemoveType";
import ShowEmployeesWithType from "./ShowEmployeesWithType";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LimitDropDown from '../../components/CustomPaginationComponents/LimitDropdown';
import ITypeEmploeeGet from '../interfaces/type/ITypeEmploeeGet';
import ITypeEmploeePage from '../interfaces/type/ITypeEmploeePage';
import ITypesFilter from '../interfaces/type/ITypesFilter';

const TypeEmployeeGrid: React.FC = (): JSX.Element => {
  const [rows, setRows] = useState<Array<GridRowsProp>>([]);
  const apiRef = useGridApiRef();
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<ITypeEmploeePage>({
    content: [],

    totalElements: 0,
    totalPages: 0,

    numberOfElements: 0,
    number: 0,

    first: true,
    last: true
  });
  const [userFilter, setUserFilter] = useState<ITypesFilter>({
    id: [],
    dateCreated: [],
    createdBy: [],
    lastUpdated: [],
    typeName: [],
    daysLeave: [],
    offset: 0,
    limit: 10,
    operation: "EQUAL",
    sort: "id",
    deleted: "false"
  });

  const { id, dateCreated, createdBy, lastUpdated, offset, limit, sort } = userFilter;
  let numberOfElements = page.numberOfElements * (page.number + 1);
  useEffect(() => {
    retrivePage();
  }, [userFilter]);

  // const retrieveRequests = async () => {
  //     await TypeService.getAll()
  //         .then((response: any) => {
  //             setRows(response.data);
  //             console.log(response.data);
  //         })
  //         .catch((e: Error) => {
  //             console.log(e);
  //         });
  // };
  const retrivePage = async () => {
    await TypeService.getAllFilterPage(userFilter)
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



  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setUserFilter({ ...userFilter, offset: 0 })
  };
  const updateFilter = useCallback(

    (newValue: ITypesFilter): void => setUserFilter(newValue),

    [setUserFilter]


  );

  const updateRows = useCallback(

    (newValue: GridRowsProp): void => setRows((prevRows) => [...prevRows, newValue]),

    [setRows]
  );
  const removeRoll = useCallback(

    (rowId: number): void => handleDeleteRow(rowId),

    [setRows]
  );
  const handleDeleteRow = (rowId: number) => {
    apiRef.current.updateRows([{ id: rowId, _action: 'delete' }]);
  };
  const handleVisionClickOnDeleted = (request: ITypeEmploeeGet, rowId: any) => async () => {
    await TypeService.unMarkAsDeleted(request.id)
      .then((_response: any) => {

        if (userFilter.deleted === "true") {
          apiRef.current.updateRows([{ id: rowId, _action: "delete" }]);
          numberOfElements = numberOfElements - 1;
          page.totalElements = page.totalElements - 1;
        } else if (userFilter.deleted === "null") {
          request.deleted = false;
          apiRef.current.updateRows([{ id: rowId }]);
        }
      })
      .catch((e: AxiosError<any, any>) => {
        if (e.response) {
          console.log();
        }

      });
  };
  function renderDeletedButtons(row: ITypeEmploeeGet, id: GridRowId, TypeRemoveProps: { typeEmployee: any; onDelete: (rowId: number) => void; }): JSX.Element {
    console.log(row)
    if (row.deleted) {
      return (
        <GridActionsCellItem
          icon={<Tooltip title={t('publish')}><VisibilityIcon /></Tooltip>}
          label="Publish"
          className="textPrimary"
          onClick={handleVisionClickOnDeleted(row, id)}
          color="inherit"
        />
      );
    } else {
      return (<RemoveType {...TypeRemoveProps} />)
    };
  }
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 0.25
    },
    {
      field: 'typeName',
      headerName: t(`LeaveTypes.TypeName`)!,
      flex: 1
    },
    {
      field: 'daysLeave',
      headerName: t(`LeaveTypes.DaysLeave`)!,
      flex: 1
    },
    {
      field: 'createdBy',
      headerName: t(`CreatedBy`)!,
      flex: 1
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t(`LeaveTypes.Actions`)!,
      flex: 0.75,
      cellClassName: 'actions',
      getActions: ({ row, id }) => {

        const TypeRemoveProps = {
          typeEmployee: row,
          onDelete: removeRoll
        }
        const ShowEmployeesProps = {
          typeEmployee: row
        }

        return [
          renderDeletedButtons(row, id, TypeRemoveProps),
          <ShowEmployeesWithType {...ShowEmployeesProps} />
        ];
      },
    }
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

  const calculateElements = () => {
    if (!page.last) {
      return <Grid >{userFilter.offset + 1}-{page.numberOfElements * (page.number + 1)} {t('of')}  {page.totalElements}</Grid>
    } else {
      return <Grid >{userFilter.offset + 1}-{page.totalElements} {t('of')}  {page.totalElements}</Grid>
    }
  };

  const updateFilterLimit = useCallback(
    (newValue: number): void => setUserFilter({ ...userFilter, limit: newValue }),

    [setUserFilter]

  );
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

  const ListAllFilterProps = {
    onAdd: updateFilter,
    onSubmitChild: onSubmit,
    value: userFilter,
  }

  const ListAllAddTypeProps = {
    onAdd: updateRows
  }
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <AddType {...ListAllAddTypeProps} />
        <ListAllTypeFilter {...ListAllFilterProps} />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>

    );
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
    />
  )
};
export default TypeEmployeeGrid;




