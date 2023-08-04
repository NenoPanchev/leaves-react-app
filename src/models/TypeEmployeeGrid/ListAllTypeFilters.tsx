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
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyAddFilter from '../../components/AddFilter/AddFilter';
import MyAddFilterDays from '../../components/AddFilter/AddFilterDays';
import ITypesFilter from '../interfaces/type/ITypesFilter';


type ListAllTypeFilterProps = {
    value: ITypesFilter
    onSubmitChild: (e: { preventDefault: () => void; }) => void;
    onAdd: (filter: ITypesFilter) => void;
}
const ListAllTypeFilter: React.FC<ListAllTypeFilterProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [t] = useTranslation();
    const [filter, setUserFilter] = useState<ITypesFilter>(props.value);
    const { createdBy, daysLeave, typeName, sort, operation, deleted } = filter;

    const onSubmitChild = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();
        props.onAdd(filter);
        props.onSubmitChild(e);
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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

    const updateFilterTypeName = useCallback(
        (newValue: string): void => setUserFilter({ ...filter, [newValue]: checkForSameString(newValue, typeName) }),

        [setUserFilter]

    );
    const updateFilterDaysLeave = useCallback(
        (newValue: any): void => setUserFilter({ ...filter, [newValue]: checkForSameString(newValue, daysLeave) }),

        [setUserFilter]

    );
    const updateFilterDaysSlider = useCallback(
        (startValue: any, endValue: any): void => handleUpdateFilterDaysSlider(startValue, endValue),

        [setUserFilter]

    );

    function handleUpdateFilterDaysSlider(startValue: any, endValue: any) {

        daysLeave.length = 0;

        setUserFilter({ ...filter, [startValue]: daysLeave.push(startValue), [endValue]: daysLeave.push(endValue) })

    }
    
    function limitString(txt: string) {
        if (txt.length >= 15) {
            return txt.substring(0, 15).concat('...');
        } else {
            return txt;
        }
    }
    function changeOperation(txt: string) {
        daysLeave.length=0;
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

    function renderDaysList() {
        
        if (operation === "EQUAL") {
            return (<List >
                {daysLeave.map((item) => {
                    return (<ListItem key={item}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete"
                                onClick={(_event) => setUserFilter({ ...filter, [item]: daysLeave.splice(daysLeave.indexOf(item), 1) })}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                        <ListItemText
                            primary={limitString(String(item))}
                        />
                    </ListItem>
                    )
                })}
            </List>);
        }
        else if (operation === "RANGE") {
            if (daysLeave.length > 1) {
                return (
                    <List >
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete"
                                    onClick={(_event) => setUserFilter({
                                        ...filter,
                                        [daysLeave[0]]: daysLeave.splice(daysLeave.indexOf(daysLeave[0]), 1),
                                        [daysLeave[0]]: daysLeave.splice(daysLeave.indexOf(daysLeave[1]), 1)
                                    })}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                            <ListItemText
                                primary={daysLeave[0] + " - " + daysLeave[1]}
                            />
                        </ListItem>
                    </List>
                );
            }

        }

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
                                        return (<ListItem key={item}
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

                        {/* TypeName Filters */}
                        <Grid item>
                            <Grid container justifyContent="center" >
                                <Typography variant="overline" component="div">
                                    {t(`LeaveTypes.TypeName`)!}
                                </Typography>
                            </Grid>
                            <Grid container direction="column">
                                <MyAddFilter buttonName={t(`AddFilter`)!}
                                    onChange={updateFilterTypeName}
                                    nameOfField={t(`LeaveTypes.TypeName`)!} />

                                <List>
                                    {typeName.map((item) => {
                                        return (<ListItem key={item}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(_event) => setUserFilter({ ...filter, [item]: typeName.splice(typeName.indexOf(item), 1) })}>
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
                        {/* TypeName By Filters END */}

                        {/* DaysLeave Filter */}
                        <Grid item >
                            <Grid container justifyContent="center" >
                                <Typography variant="overline" component="div">
                                    {t(`LeaveTypes.DaysLeave`)!}
                                </Typography>
                            </Grid>
                            <Grid container direction="column" >
                                <MyAddFilterDays buttonName={t(`AddFilter`)!}
                                onChange={updateFilterDaysLeave}
                                nameOfField={t(`LeaveTypes.DaysLeave`)!}
                                operation={operation}
                                onChangeSlider={updateFilterDaysSlider} 
                                initialStart={daysLeave[0]} 
                                initialEnd={daysLeave[1]} />

                                {renderDaysList()}

                            </Grid>
                        </Grid>
                        {/* DaysLeave Filter */}

                    </Grid >
                </DialogContent>


                <DialogActions>
                    <Grid container direction="row">
                        <Grid item >

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
                                    <MenuItem value={"RANGE"}>{t('range')}</MenuItem>
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
                                    <MenuItem value={"typeName"}>{t('LeaveTypes.TypeName')}</MenuItem>
                                    <MenuItem value={"daysLeave"}>{t('LeaveTypes.DaysLeave')}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 70, minHeight: 10 }}>
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
                                {/* <Typography variant="overline" fontSize="subtitle1"> */}
                                {t(`ListAllFilters.FilterButton`)!}
                                {/* </Typography> */}
                            </Button>
                            <Button onClick={handleClose}>
                                {/* <Typography variant="overline" fontSize="subtitle1" > */}
                                {t(`Close`)!}
                                {/* </Typography> */}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
export default ListAllTypeFilter;