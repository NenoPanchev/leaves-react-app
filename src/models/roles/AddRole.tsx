import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Box, TextField, Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreate } from '../../services/roleService';
import { AddButtonProps, IPermission } from '../interfaces/common/commonInterfaces';
import { PERMISSIONS } from '../../constants/GlobalConstants';
import { Permission } from '../objects/Permission';
import mapPermissionName from '../../services/permissionService'
import { appendPermissionsToFormData } from '../../services/roleService';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';


export default function AddRoleButton(props: AddButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);
    let nError = false;
    const [permissions, setPermissions] = React.useState<Permission[] | null>(null);
    const {user} = React.useContext(AuthContext);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const addRole = useCreate();
    const permissionsPlaceholder = t('Permissions');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const errors = validate(data);
        appendPermissionsToFormData(data, permissions);
          
        if (errors) {
            return;
        }
        addRole(data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))
        setOpen(false);
    }

    function validate(formData: FormData): boolean {
        const name:string = JSON.parse(JSON.stringify(formData.get('name')));
        nError = (name.length < 4 || name.length > 20);
        setNameError(name.length < 4 || name.length > 20);
        return nError;
    }

    if (!user?.hasRole('SUPER_ADMIN')) {        
        return null;
    }

    return (
        <React.Fragment>
            <Button
                variant='outlined'
                color='success'
                onClick={handleClickOpen}
            >
                {t('Add Role')}
            </Button>
            <Dialog

                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                {t('Add Role')}
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
                            error={nameError}
                            helperText={nameError ? t('Name must be between 4 and 20 characters') : null}
                        />
                        <Autocomplete
                            multiple
                            id="users"
                            options={PERMISSIONS}
                            filterSelectedOptions
                            size='small'
                            sx={{ minWidth: '20%' }}
                            onChange={(event, newValue) => {
                                setPermissions(mapPermissionName(newValue))
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name='permissions'
                                    margin='normal'
                                    label={t('Permissions')}
                                    placeholder={permissionsPlaceholder}
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
                                
                            }} autoFocus>
                            {t('Submit')}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </ React.Fragment>
    );
}