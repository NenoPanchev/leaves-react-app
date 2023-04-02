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
    const [permissions, setPermissions] = React.useState<Permission[] | null>(null);
    const {user} = React.useContext(AuthContext);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const addRole = useCreate();
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

        appendPermissionsToFormData(data, permissions!);
          
        addRole(data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))

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
                                    label={t('Roles')}
                                    placeholder={rolesPlaceholder}
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