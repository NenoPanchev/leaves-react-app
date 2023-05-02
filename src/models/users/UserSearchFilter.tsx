import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useFetchAllNames } from '../../services/roleService';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { DEFAULT_OFFSET } from '../../constants/GlobalConstants';
import { IUserSearchFilterProps } from '../interfaces/user/IUserSearchFilterProps';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../SearchFilter.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';


function UserSearchFilter(props: IUserSearchFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.filter.name);
    const [email, setEmail] = React.useState(props.filter.email);
    const [department, setDepartment] = React.useState(props.filter.department);
    const [roles, setRoles] = React.useState<string[]>(props.filter.roles);
    const [position, setPosition] = React.useState(props.filter.position);
    const [greaterThanOrEqualToDate, setGreaterThanOrEqualToDate] = React.useState<Dayjs | null>(props.filter.greaterThanOrEqualToDate);
    const [lessThanOrEqualToDate, setLessThanOrEqualToDate] = React.useState<Dayjs | null>(props.filter.lessThanOrEqualToDate);
    const [greaterThanOrEqualToPaidLeave, setGreaterThanOrEqualToPaidLeave] = React.useState(props.filter.greaterThanOrEqualToPaidLeave);
    const [lessThanOrEqualToPaidLeave, setLessThanOrEqualToPaidLeave] = React.useState(props.filter.lessThanOrEqualToPaidLeave);
    const roleNames = useFetchAllNames(props.refreshCurrentState);
    if (!roleNames.includes('SUPER_ADMIN')) {
        roleNames.unshift('SUPER_ADMIN');
    }
    const { t } = useTranslation();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        props.setFilter({
            ...props.filter, name: name, email: email, department: department,
            roles: roles, position: position, greaterThanOrEqualToDate: greaterThanOrEqualToDate,
            offset: DEFAULT_OFFSET
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function clearFilter() {
        props.setFilter({
            ...props.filter, name: '', email: '', department: '',
            roles: [], offset: DEFAULT_OFFSET
        })
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
                            <TextField
                                margin="normal"
                                size='small'
                                id="name"
                                label={t('Name')}
                                name="name"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <TextField
                                margin="normal"
                                size='small'
                                id="email"
                                label={t('Email')}
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <Autocomplete
                                id="department"
                                options={props.departmentNames}
                                size='small'
                                filterSelectedOptions
                                sx={{ minWidth: '20%' }}
                                value={department}
                                onChange={(event, newValue) => {
                                    setDepartment(newValue!);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name='department'
                                        margin='normal'
                                        label={t('Department')}
                                        placeholder={t('Department')!}
                                    />
                                )}
                            />
                            <Autocomplete
                                multiple
                                id="users"
                                options={roleNames}
                                size='small'
                                sx={{ minWidth: '20%' }}
                                value={roles}
                                onChange={(event, newValue) => {
                                    setRoles(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin='normal'
                                        label={t('Roles')}
                                        placeholder={t('Roles')!}
                                    />
                                )}
                            />
                            <Autocomplete
                                id="position"
                                options={props.typeNames}
                                size='small'
                                filterSelectedOptions
                                sx={{ minWidth: '20%' }}
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
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                                <DatePicker label={t('Start date is after')}
                                    value={greaterThanOrEqualToDate}

                                    sx={{ marginTop: '5px', marginBottom: '5px' }}
                                    onChange={(newValue) => setGreaterThanOrEqualToDate(newValue)} />

                                <Typography>≤</Typography>
                                <Typography>{t('Start date')}</Typography>
                                <Typography>≤</Typography>

                                <DatePicker label={t('Start date is before')}
                                    value={lessThanOrEqualToDate}
                                    sx={{ marginTop: '5px', marginBottom: '5px' }}
                                    onChange={(newValue) => setLessThanOrEqualToDate(newValue)} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid className='filterBar' sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                                id="greaterThanOrEqualToPaidLeave"
                                name='greaterThanOrEqualToPaidLeave'
                                label={t('More than')!}
                                type="number"
                                value={greaterThanOrEqualToPaidLeave}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setGreaterThanOrEqualToPaidLeave(Number(e.target.value))}
                                sx={{ marginTop: '10px', marginBottom: '5px' }}
                            />
                            <Typography>≤</Typography>
                            <Typography>{t('Paid leave left')}</Typography>
                            <Typography>≤</Typography>
                            <TextField
                                id="greaterThanOrEqualToPaidLeave"
                                name='greaterThanOrEqualToPaidLeave'
                                label={t('Less than')!}
                                type="number"
                                value={lessThanOrEqualToPaidLeave}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setLessThanOrEqualToPaidLeave(Number(e.target.value))}
                                sx={{ marginTop: '10px', marginBottom: '5px' }}
                            />
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction={'row-reverse'}>
                            <Button
                                type='submit'
                                onClick={clearFilter}>
                                <CloseIcon />
                                {t('Clear')}
                            </Button>
                            <Button
                                type='submit'
                                startIcon={<FilterAltIcon />}>
                                {t('Filter')}
                            </Button>
                        </Grid>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    )
}

export default UserSearchFilter;