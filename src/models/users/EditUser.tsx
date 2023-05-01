import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Autocomplete, Tooltip, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { appendEmployeeInfoToFormData, appendRolesToFormData, useEdit } from '../../services/userService';
import { Role } from '../objects/Role';
import { mapRoleName } from '../../services/roleService';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IUserEditButtonProps } from '../interfaces/user/IUserEditButtonProps';

export default function EditUserButton(props: IUserEditButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.user.name);
    const [email, setEmail] = React.useState(props.user.email);
    const [department, setDepartment] = React.useState<string | null>(props.user.department ? props.user.department : null);
    const [position, setPosition] = React.useState<string | null>(props.user.position);
    const initialDay = dayjs(props.user.contractStartDate, 'DD.MM.YYYY');
    const [startDate, setStartDate] = React.useState<Dayjs | null>(initialDay);


    const [roles, setRoles] = React.useState<Role[]>([]);
    const { t } = useTranslation();
    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
    let nError = false;
    let eError = false;
    // let pError = false;
    // let pcError = false;
    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
    const { user } = React.useContext(AuthContext);
    const str = props.user.roles.toString();
    const arr = str.split(', ');
    const [roleNames, setRoleNames] = React.useState<string[] | null>(arr);
    const navigate = useNavigate();
    const editUser = useEdit();
    // const [showPasswordFields, setShowPasswordFields] = React.useState(false);
    const [showContractFields, setShowContractFields] = React.useState(false);
    const [contractChange, setContractChange] = React.useState('Initial');
    let typeNames = props.typeNames;

    const handleContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = (event.target as HTMLInputElement).value;
        if (value === 'Initial') {
            setStartDate(initialDay)
            typeNames.push(position!)
        } else if (value === 'New') {
            setStartDate(dayjs());
            const index = typeNames.indexOf(position!);
            if (index > -1) {
                typeNames.splice(index, 1);
            }
        }
        setContractChange(value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleShowPasswordFields = () => {
    //     setShowPasswordFields(true);
    // }
    const handleShowContractFields = () => {
        setShowContractFields(true);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        appendRolesToFormData(data, roles);
        appendEmployeeInfoToFormData(data, startDate)
        const errors = validate();
        if (errors) {
            return;
        }
        editUser(props.user.id, data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))
        handleClose();

    }

    function validate(): boolean {
        nError = (name.length < 2 || name.length > 20);
        setNameError(name.length < 2 || name.length > 20);

        var regex = new RegExp('^[a-zA-Z0-9\.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$');
        setEmailError(!regex.test(email));
        eError = (!regex.test(email));

        // setPasswordError((password.length < 4 || password.length > 20));
        // pError = ((password.length < 4 || password.length > 20));

        // setPasswordConfirmError(password !== passwordConfirm);
        // pcError = (password !== passwordConfirm);

        return nError || eError;
    }

    if (!user?.hasAuthority('WRITE') || (props.user.id === 1)) {
        return null;
    }

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Tooltip title={t('edit')}><EditIcon /></Tooltip>}
                label={t('Edit')}
                onClick={handleClickOpen}
            />
            <Dialog

                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <React.Fragment>

                    <DialogTitle id="form-dialog-title">
                        {t('Edit') + t('User')}
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
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={emailError}
                                helperText={emailError ? t('Enter valid email!') : null}
                            />
                            <Autocomplete
                                id="department"
                                options={props.departmentNames}
                                size='medium'
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
                            {!showContractFields &&
                                <Button autoFocus onClick={handleShowContractFields}>
                                    {t('Change contract')}
                                </Button>
                            }
                            {showContractFields &&
                                <>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                                        <DatePicker label={t('Employed at')}
                                            value={startDate}
                                            sx={{ marginTop: '15px', marginBottom: '5px' }}
                                            onChange={(newValue) => setStartDate(newValue)} />
                                    </LocalizationProvider>
                                    <FormControl sx={{marginLeft: '15px'}}>
                                        <FormLabel id="demo-controlled-radio-buttons-group">{t('Contract')}</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="contractChange"
                                            value={contractChange}
                                            onChange={handleContractChange}
                                        >
                                            <FormControlLabel value="Initial" control={<Radio />} label={t('Edit Initial')} />
                                            <FormControlLabel value="New" control={<Radio />} label={t('Add new')} />
                                        </RadioGroup>
                                    </FormControl>
                                    <Autocomplete
                                        id="position"
                                        options={typeNames}
                                        size='medium'
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
                                </>}
                            <Autocomplete
                                multiple
                                id="roles"
                                options={props.roleNames}
                                filterSelectedOptions
                                size='medium'
                                sx={{ minWidth: '20%' }}
                                value={roleNames!}
                                onChange={(event, newValue) => {
                                    setRoleNames(newValue)
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
                            {/* {!showPasswordFields &&
                                <Button autoFocus onClick={handleShowPasswordFields}>
                                    {t('Change password')}
                                </Button>
                            }
                            {showPasswordFields &&
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label={t('Password')}
                                        type="password"
                                        id="password"
                                        autoComplete="password"
                                        onChange={(e) => setPassword(e.target.value)}
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
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        error={passwordConfirmError}
                                        helperText={passwordConfirmError ? t('Passwords must match!') : null}
                                    />
                                </>
                            } */}
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
                </ React.Fragment>

            </Dialog>
        </ React.Fragment>
    );
}