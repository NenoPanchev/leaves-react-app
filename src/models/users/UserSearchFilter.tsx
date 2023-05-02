import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useFetchAllNames } from '../../services/roleService';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_OFFSET } from '../../constants/GlobalConstants';
import { IUserSearchFilterProps } from '../interfaces/user/IUserSearchFilterProps';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../SearchFilter.css'


function UserSearchFilter(props: IUserSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [roles, setRoles] = React.useState<string[]>([]);
    const navigate = useNavigate();
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
        setName('');
        setEmail('');
        setDepartment('');
        setRoles([]);

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
                <DialogContent>
                    <Box className='searchForm' component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'row' }}>

                        <TextField
                            margin="normal"
                            size='small'
                            required
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
                            required
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
                            required
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
                    </Box>
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
            </Dialog>
        </React.Fragment>
    )
}

export default UserSearchFilter;