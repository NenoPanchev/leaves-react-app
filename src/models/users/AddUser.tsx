import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDelete } from '../../services/deleteService';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useCreate } from '../../services/userService';

interface AddButtonProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
}

export default function AddUserButton(props: AddButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const deleteItem = useDelete({ path: path });
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
        console.log(data.get('password'));

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
                            autoFocus
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
                        <TextField
                            margin="normal"
                            fullWidth
                            id="department"
                            label="Department"
                            name="department"
                            autoComplete="department"
                            autoFocus
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