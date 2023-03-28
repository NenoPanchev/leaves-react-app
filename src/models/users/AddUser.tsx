import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { appendRolesToFormData, useCreate } from '../../services/userService';
import { AddUserButtonProps } from '../interfaces/user/userInterfaces';
import Autocomplete from '@mui/material/Autocomplete';
import { Role } from '../objects/Role';
import { mapRoleName } from '../../services/roleService';

export default function AddUserButton(props: AddUserButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [roles, setRoles] = React.useState<Role[] | null>(null);
    const navigate = useNavigate();
    const addUser = useCreate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        appendRolesToFormData(data, roles!);
        addUser(data)
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
                Add User
            </Button>
            <Dialog

                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {"Add User"}
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
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Autocomplete
                            id="users"
                            options={props.departmentNames}
                            size='medium'
                            sx={{ minWidth: '20%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name='department'
                                    margin='normal'
                                    label="Department"
                                    placeholder="Department"
                                    onChange={(e) => e.target.value}
                                />
                            )}
                        />
                        <Autocomplete
                            multiple
                            id="roles"
                            options={props.roleNames}
                            size='small'
                            sx={{ minWidth: '20%' }}
                            onChange={(event, newValue) => {
                                setRoles(mapRoleName(newValue))
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

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Password Confirm"
                            type="password"
                            id="confirm-password"
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