import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Box, TextField, Autocomplete, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreate, appendPermissionsToFormData } from '../../services/roleService';
import { PERMISSIONS } from '../../constants/GlobalConstants';
import { Permission } from '../objects/Permission';
import mapPermissionName from '../../services/permissionService'
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { IAddButtonProps } from '../interfaces/common/IAddButtonProps';


export default function AddRoleButton(props: IAddButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);
    let nError = false;
    const [permissions, setPermissions] = React.useState<Permission[] | null>(null);
    const {user} = React.useContext(AuthContext);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const addRole = useCreate();

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

    if (user?.getAuthorities() !== undefined && !user?.hasRole('SUPER_ADMIN')) {        
        return null;
    }

    return (
        <React.Fragment>
            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                <Typography variant="overline" component="div">
                    {t(`Add Role`)}
                </Typography>
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