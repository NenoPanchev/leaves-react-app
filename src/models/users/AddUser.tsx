import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Autocomplete, Typography
} from '@mui/material';
import { appendEmployeeInfoToFormData, appendRolesToFormData, useCreate } from '../../services/userService';
import { Role } from '../objects/Role';
import { mapRoleName } from '../../services/roleService';
import { useTranslation } from 'react-i18next';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import { IUserAddButtonProps } from '../interfaces/user/IUserAddButtonProps';


export default function AddUserButton(props: IUserAddButtonProps) {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
    const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<boolean>(false);
    let serverResponse = '';

    let sError = false;
    let nError = false;
    let eError = false;
    let pError = false;
    let pcError = false;
    const [roles, setRoles] = React.useState<Role[] | null>(null);
    const { t } = useTranslation();
    const addUser = useCreate();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        appendRolesToFormData(data, roles);
        appendEmployeeInfoToFormData(data, startDate);

        let errors = validate(data);
        if (errors) {
            return;
        }
        serverResponse = await addUser(data);
        setServerErrorMessage(serverResponse);
        errors = validate(data);

        if (errors) {
            return;
        }
        props.refresh(props.refreshCurrentState + 1);
        handleClose();
    }

    function validate(formData: FormData): boolean {
        const name: string = JSON.parse(JSON.stringify(formData.get('name')));
        nError = (name.length < 2 || name.length > 70);
        setNameError(name.length < 2 || name.length > 70);

        const email: string = JSON.parse(JSON.stringify(formData.get('email')));
        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$/;
        setEmailError(!regex.test(email));
        eError = (!regex.test(email));

        const password: string = JSON.parse(JSON.stringify(formData.get('password')));
        setPasswordError(password.length < 4 || password.length > 20);
        pError = (password.length < 4 || password.length > 20);

        const confirmPassword: string = JSON.parse(JSON.stringify(formData.get('confirmPassword')));
        setPasswordConfirmError(password !== confirmPassword);
        pcError = (password !== confirmPassword);

        sError = serverResponse !== '';
        setServerError(serverResponse !== '');

        return nError || eError || pError || pcError || sError;
    }

    return (
        <React.Fragment>
            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                <Typography variant="overline" component="div">
                    {t(`Add User`)}
                </Typography>
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
                        {serverError &&
                            <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography>
                        }
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
                                    placeholder={t('Department')!}
                                    onChange={(e) => e.target.value}
                                />
                            )}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                            <DatePicker label={t('Employed at')}
                                value={startDate}
                                sx={{ marginTop: '15px', marginBottom: '5px' }}
                                onChange={(newValue) => setStartDate(newValue)} />
                        </LocalizationProvider>
                        <Autocomplete
                            id="position"
                            options={props.typeNames}
                            size='medium'
                            sx={{ minWidth: '20%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name='position'
                                    margin='normal'
                                    label={t('Position')}
                                    placeholder={t('Position')!}
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
                                    placeholder={t('Roles')!}
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