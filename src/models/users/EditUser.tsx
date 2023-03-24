import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDelete } from '../../services/deleteService';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { useEdit } from '../../services/userService';

interface EditButtonProps {
    user: User
    refreshCurrentState: number
    refresh: (value: number) => void;
}

interface User {
    id: number
    name: string
    email: string
    department: string
    password: string
    passwordConfirm: string
}

export default function EditUserButton(props: EditButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [name, setName] = React.useState(props.user.name);
    const [email, setEmail] = React.useState(props.user.email);
    const [department, setDepartment] = React.useState(props.user.department);
    const [password, setPassword] = React.useState(props.user.password);
    const [passwordConfirm, setPasswordConfirm] = React.useState(props.user.passwordConfirm);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const deleteItem = useDelete({ path: path });
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
                            <TextField
                                margin="normal"
                                fullWidth
                                id="department"
                                label="Department"
                                name="department"
                                autoComplete="department"
                                autoFocus
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
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