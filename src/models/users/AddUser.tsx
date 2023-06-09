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
    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
    let nError = false;
    let eError = false;
    let pError = false;
    let pcError = false;
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
        appendRolesToFormData(data, roles);

        const errors = validate(data);
        if (errors) {
            return;
        }
        addUser(data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))
        handleClose();
    }

    function validate(formData: FormData):boolean {
        const name:string = JSON.parse(JSON.stringify(formData.get('name')));
        nError = (name.length < 2 || name.length > 20);
        setNameError(name.length < 2 || name.length > 20);

        const email:string = JSON.parse(JSON.stringify(formData.get('email')));
        var regex = new RegExp('^[a-zA-Z0-9\.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$');
        setEmailError(!regex.test(email));
        eError = (!regex.test(email));

        const password:string = JSON.parse(JSON.stringify(formData.get('password')));
        setPasswordError(password.length < 4 || password.length > 20);
        pError = (password.length < 4 || password.length > 20);

        const confirmPassword:string = JSON.parse(JSON.stringify(formData.get('confirmPassword')));
        setPasswordConfirmError(password !== confirmPassword);
        pcError = (password !== confirmPassword);
        
        return nError || eError || pError || pcError;
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
                    {t('Add User')}
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
                            error={nameError}
                            helperText={nameError ? t('Username must be between 2 and 20 characters') : null}                       
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
                            error={emailError}
                            helperText={emailError ? t('Enter valid email!') : null} 
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
                            error={passwordError}
                            helperText={passwordError ? t('Password must be between 4 and 20 characters') : null}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label={t('Password Confirm')}
                            type="password"
                            id="confirm-password"
                            error={passwordConfirmError}
                            helperText={passwordConfirmError ? t('Passwords must match!') : null}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            {t('Close')}
                        </Button>
                        <Button
                            type='submit'
                            autoFocus>
                            {t('Submit')}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </ React.Fragment>
    );
}