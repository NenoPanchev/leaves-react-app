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
import { DEFAULT_PAGE } from '../../constants/GlobalConstants';

const TypeEmployeeGrid: React.FC = (): JSX.Element => {
  const [rows, setRows] = useState<Array<GridRowsProp>>([]);
  const apiRef = useGridApiRef();
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const navBarHeight = localStorage.getItem('navBarHeight')!;
  const [page, setPage] = useState<ITypeEmploeePage>(DEFAULT_PAGE);
  const [typesFilter, setTypesFilter] = useState<ITypesFilter>({
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

  const { id, dateCreated, createdBy, lastUpdated, offset, limit, sort } = typesFilter;
  let numberOfElements = page.numberOfElements * (page.number + 1);
  useEffect(() => {
    retrivePage();
  }, [typesFilter]);

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
    await TypeService.getAllFilterPage(typesFilter)
      .then((response: any) => {
        // setRows(response.data);
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
    setTypesFilter({ ...typesFilter, offset: 0 })
  };
  const updateFilter = useCallback(

    (newValue: ITypesFilter): void => setTypesFilter(newValue),

    [setTypesFilter]


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
    console.log(typesFilter.deleted);
    if (typesFilter.deleted !== "null") {
      apiRef.current.updateRows([{ id: rowId, _action: 'delete' }]);
    }
    else {

      apiRef.current.updateRows([{ id: rowId, deleted: true }]);
    }

  };
  const handleVisionClickOnDeleted = (request: ITypeEmploeeGet, rowId: any) => async () => {
    await TypeService.unMarkAsDeleted(request.id)
      .then((_response: any) => {

        if (typesFilter.deleted === "true") {
          apiRef.current.updateRows([{ id: rowId, _action: "delete" }]);
          numberOfElements = numberOfElements - 1;
          page.totalElements = page.totalElements - 1;
        } else if (typesFilter.deleted === "null") {
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
      setTypesFilter({ ...typesFilter, offset: (typesFilter.offset - typesFilter.limit) })
    }
  };

  const onNextPage = async () => {
    if (!page.last) {
      setTypesFilter({ ...typesFilter, offset: (typesFilter.offset + typesFilter.limit) })
    }


  };

  const calculateElements = () => {
    if (!page.last) {
      return <Grid >{typesFilter.offset + 1}-{page.numberOfElements * (page.number + 1)} {t('of')}  {page.totalElements}</Grid>
    } else {
      return <Grid >{typesFilter.offset + 1}-{page.totalElements} {t('of')}  {page.totalElements}</Grid>
    }
  };

  const updateFilterLimit = useCallback(
    (newValue: number): void => setTypesFilter({ ...typesFilter, limit: newValue }),

    [setTypesFilter]

  );

  const handlePaginationModelChange = (paginationModel: any) => {
    setTypesFilter({
      ...typesFilter, offset: paginationModel.pageSize * (paginationModel.page),
      limit: paginationModel.pageSize
    })
  };
  const onFirstPage = async () => {
    if (!page.first) {
      setTypesFilter({ ...typesFilter, offset: 0 })
    }
  };
  const onLastPage = async () => {
    if (!page.last) {
      setTypesFilter({ ...typesFilter, offset: (limit * (page.totalPages - 1)) })
    }


  };

  function CustomPagination() {
    
    return <Grid container direction={'row'} alignItems="center" >
      <Grid container justifyContent="left" marginTop={1} marginBottom={-7} marginLeft={1}>
        <Grid item > <LimitDropDown onChange={updateFilterLimit} value={typesFilter.limit} /></Grid>
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
    value: typesFilter,
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
    <Grid sx={{ width: '100%', overflow: "hidden" }}>
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
export default TypeEmployeeGrid;




