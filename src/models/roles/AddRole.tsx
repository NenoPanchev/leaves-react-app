import * as React from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDelete } from '../../services/deleteService';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useCreate } from '../../services/roleService';
import { AddButtonProps, IPermission } from '../interfaces/common/commonInterfaces';
import Autocomplete from '@mui/material/Autocomplete';
import { PERMISSIONS } from '../../constants/GlobalConstants';
import { Permission } from '../objects/Permission';
import mapPermissionName from '../../services/permissionService'
import { appendPermissionsToFormData } from '../../services/roleService';


export default function AddRoleButton(props: AddButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [permissions, setPermissions] = React.useState<Permission[] | null>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const deleteItem = useDelete({ path: path });
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

        appendPermissionsToFormData(data, permissions!);
          
        addRole(data)
            .then(() => props.refresh(props.refreshCurrentState + 1))
            .then(() => navigate(path))

    }

    return (
        <React.Fragment>
            <Button
                variant='outlined'
                color='success'
                onClick={handleClickOpen}
            >
                Add Role
            </Button>
            <Dialog

                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {"Add Role"}
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
                        />
                        <Autocomplete
                            multiple
                            id="users"
                            options={PERMISSIONS}
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
            </Dialog>
        </ React.Fragment>
    );
}