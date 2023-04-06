import * as React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MyAddFilter from '../../components/AddFilter/AddFilter';
import MyAddFilterApproved from '../../components/AddFilter/AddFilterApproved';
import MyAddFilterDate from '../../components/AddFilter/AddFilterDate';
import MyAddFilterId from '../../components/AddFilter/AddFilterId';
import Filter from '../interfaces/request/Filter';


type ListAllFilterProps = {
    value: Filter
    onSubmitChild: (e: { preventDefault: () => void; }) => void;
    onAdd: (filter: Filter) => void;
}
const ListAllFilter: React.FC<ListAllFilterProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);

    const [filter, setUserFilter] = React.useState<Filter>(props.value);
    const [t, i18n] = useTranslation();



    const { id, dateCreated, createdBy, lastUpdated, startDate, endDate, approved, offset, limit, sort, operation, deleted } = filter;
    let value: number = limit;
    const onAdd = async () => {
        console.log(filter);
        props.onAdd(filter);
        setOpen(false);
    };
    const onSubmitChild = async (e: { preventDefault: () => void; }) => {
        console.log(filter);
        props.onAdd(filter);
        props.onSubmitChild(e);
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        // props.onAdd(filter);
        setOpen(false);
    };
    function checkForSameString(txt: string, list: string[]) {
        if (!list.includes(txt)) {
            return list.push(txt);
        }
    }

    const updateFilterCreatedBy = useCallback(
        (newValue: string): void => setUserFilter({ ...filter, [newValue]: checkForSameString(newValue, createdBy) }),

        [setUserFilter]

    );
    const updateFilterApproved = useCallback(
        (newValue: any): void => setUserFilter({ ...filter, [newValue]: checkForSameString(newValue, approved) }),

        [setUserFilter]

    );
    const updateFilterStartDate = useCallback(
        (newValue: any): void => setUserFilter({ ...filter, [newValue]: checkForSameString(newValue, startDate) }),

        [setUserFilter]

    );
    const updateFilterEndDate = useCallback(
        (newValue: any): void => setUserFilter({ ...filter, [newValue]: checkForSameString(newValue, endDate) }),

        [setUserFilter]

    );
    const updateFilterId = useCallback(
        (newValue: any): void => setUserFilter({ ...filter, [newValue]: checkForSameString(newValue, id) }),

        [setUserFilter]

    );
    function limitString(txt: string) {
        if (txt.length >= 15) {
            return txt.substring(0, 15).concat('...');
        } else {
            return txt;
        }
    }
    function checkForNullString(txt: string) {
        if (txt === "null") {
            return t('Requests.notProcessedS');
        } else if (txt === "false"){
            return  t('Requests.rejectedS');
        }else
        {
            return t('Requests.approvedS');
        }
    }
  
    function changeOperation(txt: string) {
        setUserFilter({ ...filter, operation: txt })
        props.value.operation = txt;
    }
    function changeSort(txt: string) {
        setUserFilter({ ...filter, sort: txt })
        props.value.sort = txt;
    }
    function changeDeleted(txt: string) {
        setUserFilter({ ...filter, deleted: txt })
        props.value.deleted = txt;
    }
    function changeOffset() {
        setUserFilter({ ...filter, offset: 0 })
        props.value.offset = 0;
    }

    return (
        <React.Fragment>
            <Button startIcon={<FilterListIcon />} onClick={handleClickOpen} >

                <Typography variant="overline" >
                    {t(`DataGridToolBar.ManageFilters`)!}
                </Typography>

            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='lg'
            >
                <Grid container
                    alignItems="center"
                    justifyContent="center">
                    <DialogTitle alignItems="center">{t(`ListAllFilters.Filter`)!}</DialogTitle>
                </Grid>
                <DialogContent>
                    <Grid container
                        spacing={5}
                        direction="row"
                        alignItems="stretch"
                        justifyContent="space-evenly"
                        wrap='wrap'>

                        {/* Created By Filters */}
                        <Grid item>
                            <Grid container justifyContent="center" >
                                <Typography variant="overline" component="div">
                                    {t(`CreatedBy`)!}
                                </Typography>
                            </Grid>
                            <Grid container direction="column">
                                <MyAddFilter buttonName={t(`AddFilter`)!}
                                    onChange={updateFilterCreatedBy}
                                    nameOfField={t(`CreatedBy`)!} />

                                <List>
                                    {createdBy.map((item) => {
                                        return (<ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(_event) => setUserFilter({ ...filter, [item]: createdBy.splice(createdBy.indexOf(item), 1) })}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            }>
                                            <ListItemText
                                                primary={limitString(item)}
                                            />
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        {/* Created By Filters END */}

                        {/* Approved By Filters */}
                        <Grid item>
                            <Grid container justifyContent="center" >
                                <Typography variant="overline" component="div">
                                    {t(`Requests.Aprooved`)!}
                                </Typography>
                            </Grid>
                            <Grid container direction="column">
                                <MyAddFilterApproved buttonName={t(`AddFilter`)!}
                                    onChange={updateFilterApproved}
                                    nameOfField={t(`Requests.Aprooved`)!} />
                                <List>
                                    {approved.map((item) => {
                                        return (<ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(_event) => setUserFilter({ ...filter, [item]: approved.splice(approved.indexOf(item), 1) })}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                            <ListItemText
                                                primary={checkForNullString(item)}
                                            />
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        {/* Approved By Filters end */}

                        {/* StartDate By Filters */}
                        <Grid item>
                            <Grid container justifyContent="center" >
                                <Typography variant="overline" component="div">
                                    {t(`Requests.StartDate`)!}
                                </Typography>
                            </Grid>
                            <Grid container direction="column">
                                <MyAddFilterDate buttonName={t(`AddFilter`)!}
                                    onChange={updateFilterStartDate}
                                    nameOfField={t(`Requests.StartDate`)!}
                                />
                                <List>
                                    {startDate.map((item) => {
                                        return (<ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(_event) => setUserFilter({ ...filter, [item]: startDate.splice(startDate.indexOf(item), 1) })}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                            <ListItemText
                                                primary={item}
                                            />
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        {/* StartDate By Filters end */}

                        {/* EndDate By Filters */}
                        <Grid item>

                            <Grid container justifyContent="center" >
                                <Typography variant="overline" component="div">
                                    {t(`Requests.EndDate`)!}
                                </Typography>
                            </Grid>

                            <Grid container direction="column">
                                <MyAddFilterDate buttonName={t(`AddFilter`)!}
                                    onChange={updateFilterEndDate}
                                    nameOfField={t(`Requests.EndDate`)!}
                                />
                                <List>
                                    {endDate.map((item) => {
                                        return (<ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(_event) => setUserFilter({ ...filter, [item]: endDate.splice(endDate.indexOf(item), 1) })}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                            <ListItemText
                                                primary={item}
                                            />
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        {/* EndDate Filter end */}

                        {/* Id Filter */}
                        <Grid item>
                            <Grid container justifyContent="center" >
                                <Typography variant="overline" component="div">
                                    Id
                                </Typography>
                            </Grid>
                            <Grid container direction="column">
                                <MyAddFilterId buttonName={t(`AddFilter`)!}
                                    onChange={updateFilterId}
                                    nameOfField={'Id'}
                                />
                                <List >
                                    {id.map((item) => {
                                        return (<ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(_event) => setUserFilter({ ...filter, [item]: id.splice(id.indexOf(item), 1) })}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                            <ListItemText
                                                primary={limitString(String(item))}
                                            />
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        {/* Id By Filter end */}
                    </Grid >
                </DialogContent>

                <DialogActions>
                    <Grid container direction="row">
                        <Grid item>

                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="operation-label">{t('operation')}</InputLabel>
                                <Select
                                    labelId="operation-label"
                                    id="operation-select"
                                    value={operation}
                                    label="Operetion"
                                    onChange={(event) => changeOperation(event.target.value)}
                                >
                                    <MenuItem value={"EQUAL"}>{t('equal')}</MenuItem>
                                    <MenuItem value={"LESS_THAN"}>{t('lessThan')}</MenuItem>
                                    <MenuItem value={"GREATER_THAN"}>{t('greaterThan')}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="sort-label">{t('sort')}</InputLabel>
                                <Select
                                    labelId="sort-label"
                                    id="sort-select"
                                    value={sort}
                                    label="Sort"
                                    onChange={(event) => changeSort(event.target.value)}
                                >
                                    <MenuItem value={"id"}>ID</MenuItem>
                                    <MenuItem value={"startDate"}>{t('Requests.StartDate')}</MenuItem>
                                    <MenuItem value={"endDate"}>{t('Requests.EndDate')}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="operation-label">{t('deleted')}</InputLabel>
                                <Select
                                    labelId="operation-label"
                                    id="operation-select"
                                    value={deleted}
                                    label="Operetion"
                                    onChange={(event) => changeDeleted(event.target.value)}
                                >
                                    <MenuItem value={"null"}>{t('All')}</MenuItem>
                                    <MenuItem value={"true"}>{t('justDeleted')}</MenuItem>
                                    <MenuItem value={"false"}>{t('withoutDeleted')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item marginLeft="auto" marginTop="auto" marginBottom="auto">
                            <Button startIcon={<FilterAltIcon />} onClick={onSubmitChild}>
                                {t(`ListAllFilters.FilterButton`)!}
                            </Button>
                            <Button onClick={handleClose}>
                                {t(`Close`)!}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
export default ListAllFilter;