import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { DEFAULT_OFFSET } from '../../constants/GlobalConstants';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { IDateComparison } from '../interfaces/user/IStartDateComparison';
import { IContractFilterProps } from '../interfaces/contract/IContractFilterProps';
import '../SearchFilter.css'


function ContractFilter(props: IContractFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState(props.filter.typeName);
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());
    const [operator, setOperator] = React.useState('GREATER');
    const [startDateComparisons, setStartDateComparisons] = React.useState(props.filter.startDateComparisons);
    const [endDateComparisons, setEndDateComparisons] = React.useState(props.filter.endDateComparisons);
    const [refreshCounter, setRefreshCounter] = React.useState(0);
    const { t } = useTranslation();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        props.setFilter({
            ...props.filter, typeName: position, startDateComparisons: startDateComparisons,
            endDateComparisons: endDateComparisons, offset: DEFAULT_OFFSET
        })
    }

    function addStartDateFilter(newDate: Dayjs) {
        let arr = startDateComparisons;
        const dateString = dayjs(newDate, "DD.MM.YYYY");
        const comparison: IDateComparison = {
            operator: operator,
            date: dateString.format('DD.MM.YYYY')
        }
        arr.push(comparison);
        setStartDate(dateString);
        setStartDateComparisons(arr);
    };
    function addEndDateFilter(newDate: Dayjs) {
        let arr = endDateComparisons;
        const dateString = dayjs(newDate, "DD.MM.YYYY");
        const comparison: IDateComparison = {
            operator: operator,
            date: dateString.format('DD.MM.YYYY')
        }
        arr.push(comparison);
        setEndDate(dateString);
        setEndDateComparisons(arr);
    };

    function removeStartDateFilter(index: number) {
        let arr = startDateComparisons;
        arr.splice(index, 1);
        setStartDateComparisons(arr);
        setRefreshCounter(refreshCounter + 1);
    }
    function removeEndDateFilter(index: number) {
        let arr = endDateComparisons;
        arr.splice(index, 1);
        setEndDateComparisons(arr);
        setRefreshCounter(refreshCounter + 1);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function clearFilter() {
        props.setFilter({
            ...props.filter, typeName: '', startDateComparisons: [],
            endDateComparisons: [], offset: DEFAULT_OFFSET
        });
    }
    function getOperatorSign(operator: string) {
        switch (operator) {
            case 'GREATER':
                return '>'
            case 'GREATER_OR_EQUAL':
                return '≥'
            case 'EQUAL':
                return '='
            case 'NOT_EQUAL':
                return '≠'
            case 'LESS_OR_EQUAL':
                return '≤'
            case 'LESS':
                return '<'
            default:
                break;
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
                <Box id='userFilterForm' className='searchForm' component="form" onSubmit={handleSubmit} noValidate>
                    <DialogContent>
                        <Grid className='filterBar' sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Autocomplete
                                id="position"
                                options={props.typeNames}
                                size='small'
                                filterSelectedOptions
                                sx={{ minWidth: '40%' }}
                                value={position}
                                onChange={(event, newValue) => {
                                    setPosition(newValue!);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name='position'
                                        margin='normal'
                                        label={t('Position')}
                                        placeholder={t('Position')!}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid className='filterBar' sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Grid container direction="column">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                                    <DatePicker label={t('Start date')}
                                        value={startDate}
                                        sx={{ marginTop: '10px', marginBottom: '5px' }}
                                        onChange={(newValue) => setStartDate(newValue)} />

                                </LocalizationProvider>
                                <Button
                                    onClick={(e) => addStartDateFilter(startDate!)}>
                                    {t('Add start date filter')}
                                </Button>
                                <List>
                                    {startDateComparisons.map((comparison, index) => {
                                        return (<ListItem key={index}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(e) => removeStartDateFilter(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                            <ListItemText
                                                primary={getOperatorSign(comparison.operator) + ' ' + comparison.date}
                                                sx={{ textAlign: 'center' }}
                                            />
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                            <Grid container direction="column">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                                    <DatePicker label={t('End date')}
                                        value={endDate}

                                        sx={{ marginTop: '10px', marginBottom: '5px' }}
                                        onChange={(newValue) => setEndDate(newValue)} />

                                </LocalizationProvider>
                                <Button
                                    onClick={(e) => addEndDateFilter(endDate!)}>
                                    {t('Add end date filter')}
                                </Button>
                                <List>
                                    {endDateComparisons.map((comparison, index) => {
                                        return (<ListItem key={index}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete"
                                                    onClick={(e) => removeEndDateFilter(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                            <ListItemText
                                                primary={getOperatorSign(comparison.operator) + ' ' + comparison.date}
                                                sx={{ textAlign: 'center' }}
                                            />
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction={'row'}>
                            <Grid item>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel id="operation-label">{t('operation')}</InputLabel>
                                    <Select
                                        labelId="operation-label"
                                        id="operation-select"
                                        value={operator}
                                        label="Operetion"
                                        onChange={(event) => setOperator(event.target.value)}
                                    >
                                        <MenuItem value={"GREATER"}>{'>'}</MenuItem>
                                        <MenuItem value={"GREATER_OR_EQUAL"}>{'≥'}</MenuItem>
                                        <MenuItem value={"EQUAL"}>{'='}</MenuItem>
                                        <MenuItem value={"NOT_EQUAL"}>{'≠'}</MenuItem>
                                        <MenuItem value={"LESS_OR_EQUAL"}>{'≤'}</MenuItem>
                                        <MenuItem value={"LESS"}>{'<'}</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item marginLeft="auto" marginTop="auto" marginBottom="auto">
                                <Button
                                    type='submit'
                                    startIcon={<FilterAltIcon />}>
                                    {t('Filter')}
                                </Button>
                                <Button
                                    type='submit'
                                    onClick={clearFilter}>
                                    <CloseIcon />
                                    {t('Clear')}
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment >
    )
}

export default ContractFilter;