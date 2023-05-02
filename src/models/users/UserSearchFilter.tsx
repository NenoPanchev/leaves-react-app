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


function UserSearchFilter(props: IUserSearchFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.filter.name);
    const [email, setEmail] = React.useState(props.filter.email);
    const [department, setDepartment] = React.useState(props.filter.department);
    const [roles, setRoles] = React.useState<string[]>(props.filter.roles);
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
            roles: roles, offset: DEFAULT_OFFSET
        })
        props.refresh(props.refreshCurrentState + 1);
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
        props.refresh(props.refreshCurrentState + 1);
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
                    <DialogContent className='filterBar' sx={{ display: 'flex', flexDirection: 'row' }}>
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
                            <TextField
                                margin="normal"
                                size='small'
                                id="department"
                                label={t('Department')}
                                name="department"
                                autoComplete="department"
                                value={department}
                                onChange={(e) => {
                                    setDepartment(e.target.value);
                                }}
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