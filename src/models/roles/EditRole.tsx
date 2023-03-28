import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDelete } from '../../services/deleteService';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { useEdit, appendPermissionsToFormData } from '../../services/roleService';
import { EditRoleButtonProps } from '../interfaces/role/roleInterfaces';
import { PERMISSIONS } from '../../constants/GlobalConstants';
import Autocomplete from '@mui/material/Autocomplete';
import mapPermissionName from '../../services/permissionService'
import { Permission } from '../objects/Permission';


export default function EditRoleButton(props: EditRoleButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.role.name);
    const [permissions, setPermissions] = React.useState<Permission[] | null>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const deleteItem = useDelete({ path: path });
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
        appendPermissionsToFormData(data, permissions!);
        editRole(props.role.id, data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))

    }

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
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
                        {"Edit Role"}
                    </DialogTitle>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <DialogContent>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Autocomplete
                                multiple
                                id="permissions"
                                options={PERMISSIONS}
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
                                        label="Roles"
                                        placeholder="Roles"
                                    />
                                )}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                type='submit'
                                onClick={() => {
                                    handleClose();
                                }} autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Box>
                </ React.Fragment>

            </Dialog>
        </ React.Fragment>
    );
}