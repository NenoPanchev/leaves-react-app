import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Box, TextField, Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEdit, appendPermissionsToFormData } from '../../services/roleService';
import { EditRoleButtonProps } from '../interfaces/role/roleInterfaces';
import { PERMISSIONS } from '../../constants/GlobalConstants';
import mapPermissionName from '../../services/permissionService'
import { Permission } from '../objects/Permission';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';


export default function EditRoleButton(props: EditRoleButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.role.name);
    const [nameError, setNameError] = React.useState(false);
    let nError = false;
    const [permissions, setPermissions] = React.useState<Permission[] | null>(null);
    const {user} = React.useContext(AuthContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const editRole = useEdit();
    const str = props.role.permissions.toString();
    const arr = str.split(', ');
    const [permissionNames, setPermissionNames] = React.useState<string[] | null>(arr);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const errors = validate();

        if (errors) {
            return;
        }

        appendPermissionsToFormData(data, permissions!);
        editRole(props.role.id, data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))
        handleClose();
    }

    function validate():boolean {
        nError = (name.length < 4 || name.length > 20);
        setNameError(name.length < 4 || name.length > 20);
        return nError;
    }

    if (!user?.hasAuthority('WRITE') || (props.role.id == 1)) {        
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
                <React.Fragment>

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
                                error={nameError}
                                helperText={nameError ? t('Name must be between 4 and 20 characters') : null}
                            />
                            <Autocomplete
                                multiple
                                id="permissions"
                                options={PERMISSIONS}
                                filterSelectedOptions
                                size='small'
                                sx={{ minWidth: '20%' }}
                                value={permissionNames!}
                                onChange={(event, newValue) => {
                                    setPermissions(mapPermissionName(newValue))
                                    setPermissionNames(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin='normal'
                                        label={t('Permissions')}
                                        placeholder={t('Permissions')!}
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
                </ React.Fragment>

            </Dialog>
        </ React.Fragment>
    );
}