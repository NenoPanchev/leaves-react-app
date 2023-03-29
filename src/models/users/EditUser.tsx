import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Box, TextField, Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { appendRolesToFormData, useEdit } from '../../services/userService';
import { EditUserButtonProps } from '../interfaces/user/userInterfaces';
import { Role } from '../objects/Role';
import { mapRoleName } from '../../services/roleService';

export default function EditUserButton(props: EditUserButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.user.name);
    const [email, setEmail] = React.useState(props.user.email);
    const [department, setDepartment] = React.useState<string>(props.user.department);
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [password, setPassword] = React.useState(props.user.password);
    const [passwordConfirm, setPasswordConfirm] = React.useState(props.user.passwordConfirm);
    const str = props.user.roles.toString();
    const arr = str.split(', ');
    const [roleNames, setRoleNames] = React.useState<string[] | null>(arr);
    const navigate = useNavigate();
    const editUser = useEdit();   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        appendRolesToFormData(data, roles);
        editUser(props.user.id, data)
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
                        {"Edit User"}
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Autocomplete
                                id="department"
                                options={props.departmentNames}
                                size='medium'
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
                                        label="Department"
                                        placeholder="Department"
                                    />
                                )}
                            />
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Password Confirm"
                                type="password"
                                id="confirm-password"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
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