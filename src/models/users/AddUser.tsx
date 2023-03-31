import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Box, TextField, Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { appendRolesToFormData, useCreate } from '../../services/userService';
import { AddUserButtonProps } from '../interfaces/user/userInterfaces';
import { Role } from '../objects/Role';
import { mapRoleName } from '../../services/roleService';
import { useTranslation } from 'react-i18next';

export default function AddUserButton(props: AddUserButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [roles, setRoles] = React.useState<Role[] | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const addUser = useCreate();
    const departmentPlaceholder = t('Department');
    const rolesPlaceholder = t('Roles');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        appendRolesToFormData(data, roles!);
        addUser(data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))

    }

    return (
        <React.Fragment>
            <Button
                variant='outlined'
                color='success'
                onClick={handleClickOpen}
            >
                {t('Add User')}
            </Button>
            <Dialog

                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {t('ADD USER')}
                </DialogTitle>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                    <DialogContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={t('Name')}
                            name="name"
                            autoComplete="name"                        
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t('Email')}
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Autocomplete
                            id="department"
                            options={props.departmentNames}
                            size='medium'
                            sx={{ minWidth: '20%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name='department'
                                    margin='normal'
                                    label={t('Department')}
                                    placeholder={departmentPlaceholder}
                                    onChange={(e) => e.target.value}
                                />
                            )}
                        />
                        <Autocomplete
                            multiple
                            id="roles"
                            options={props.roleNames}
                            filterSelectedOptions
                            size='medium'
                            sx={{ minWidth: '20%' }}
                            onChange={(event, newValue) => {
                                setRoles(mapRoleName(newValue))
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin='normal'
                                    label={t('Roles')}
                                    placeholder={rolesPlaceholder}
                                />
                            )}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t('Password')}
                            type="password"
                            id="password"
                            autoComplete="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label={t('Password Confirm')}
                            type="password"
                            id="confirm-password"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            {t('Close')}
                        </Button>
                        <Button
                            type='submit'
                            onClick={() => {
                                handleClose();
                            }} autoFocus>
                            {t('Submit')}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </ React.Fragment>
    );
}