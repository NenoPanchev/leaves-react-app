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
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { useEdit } from '../../services/departmentService';

interface EditButtonProps {
    department: Department
    refreshCurrentState: number
    refresh: (value: number) => void;
}

interface Department {
    id: number
    name: string
    adminEmail: string
    employeeEmails: string[]
}

export default function EditDepartmentButton(props: EditButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.department.name);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const deleteItem = useDelete({ path: path });
    const navigate = useNavigate();
    const editDepartment = useEdit();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        editDepartment(props.department.id, data)
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