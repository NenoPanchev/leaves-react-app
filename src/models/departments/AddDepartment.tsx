import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Autocomplete, Typography
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { appendEmployeesToFormData, useCreate } from '../../services/departmentService';
import { IDepartmentAddButtonProps } from '../interfaces/department/IDepartmentAddButtonProps';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';


export default function AddDepartmentButton(props: IDepartmentAddButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [availableEmployees, setAvailableEmployees] = React.useState<string[]>([]);
    const [nameError, setNameError] = React.useState(false);
    let nError = false;
    const navigate = useNavigate();
    const addDepartment = useCreate();
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        appendEmployeesToFormData(data, availableEmployees);
        
        const errors = validate();
        if (errors) {
            return;
        }
        addDepartment(data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))
        handleClose();
    }

    function validate(): boolean {
        nError = (name.length < 2 || name.length > 20);
        setNameError(name.length < 2 || name.length > 20);
        return nError;
    }

    return (
        <React.Fragment>
            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                <Typography variant="overline" component="div">
                    {t(`Add Department`)}
                </Typography>
            </Button>
            <Dialog

                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                    <DialogTitle id="form-dialog-title">
                        {t('Add Department')}
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
                                onChange={(e) => setName(e.target.value)}
                                error={nameError}
                                helperText={nameError ? t('Department name must be between 2 and 20 characters') : null}
                            />
                            <Autocomplete
                                id="adminEmail"
                                options={props.userEmails}
                                size='medium'
                                sx={{ minWidth: '20%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name='adminEmail'
                                        margin='normal'
                                        label={t('Admin')}
                                        placeholder={t('Admin')!}
                                        onChange={(e) => e.target.value}
                                    />
                                )}
                            />
                            <Autocomplete
                                multiple
                                id="employeeEmails"
                                options={props.availableEmployeesEmails}
                                filterSelectedOptions
                                size='medium'
                                sx={{ minWidth: '20%' }}
                                onChange={(event, newValue) => {
                                    setAvailableEmployees(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin='normal'
                                        label={t('Employees')}
                                        placeholder={t('Employees')!}
                                    />
                                )}
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