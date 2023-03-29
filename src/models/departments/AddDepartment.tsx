import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Box, TextField, Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreate } from '../../services/departmentService';
import { AddDepartmentButtonProps } from '../interfaces/department/departmentInterfaces';

export default function AddDepartmentButton(props: AddDepartmentButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const addDepartment = useCreate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        addDepartment(data)
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
                Add Department
            </Button>
            <Dialog

                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <React.Fragment>

                    <DialogTitle id="form-dialog-title">
                        {"Add Department"}
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
                                id="adminEmail"
                                options={props.userEmails}
                                size='medium'
                                sx={{ minWidth: '20%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name='adminEmail'
                                        margin='normal'
                                        label="Admin"
                                        placeholder="Admin"
                                        onChange={(e) => e.target.value}
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