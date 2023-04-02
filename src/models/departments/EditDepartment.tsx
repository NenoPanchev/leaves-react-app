import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Box, TextField, Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEdit } from '../../services/departmentService';
import { EditDepartmentButtonProps } from '../interfaces/department/departmentInterfaces';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function EditDepartmentButton(props: EditDepartmentButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.department.name);
    const [adminEmail, setAdminEmail] = React.useState(props.department.adminEmail);
    const {user} = React.useContext(AuthContext);
    const navigate = useNavigate();
    const editDepartment = useEdit();  
    const { t } = useTranslation();  
    const adminPlaceholder = t('Admin');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        editDepartment(props.department.id, data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))

    }

    if (!user?.hasAuthority('WRITE')) {
        return null;
    }

    return (

        <React.Fragment>
            <GridActionsCellItem
                icon={<EditIcon />}
                label={t('Edit')}
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {t('Edit') + t('Role')}
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
                        />
                        <Autocomplete
                                id="adminEmail"
                                options={props.userEmails}
                                size='medium'
                                value={adminEmail}
                                onChange={(event, newValue) => {
                                    setAdminEmail(newValue!);
                                }}
                                sx={{ minWidth: '20%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name='adminEmail'
                                        margin='normal'
                                        label={t('Admin')}
                                        placeholder={adminPlaceholder}
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