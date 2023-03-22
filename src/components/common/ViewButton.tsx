import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import RoleView from '../../models/roles/RoleView';
import DepartmentView from '../../models/departments/DepartmentView';


interface ViewButtonProps {
    id: number
}

export default function ViewButton(props: ViewButtonProps) {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth='md'
                aria-labelledby="responsive-dialog-title"
            >

                {
                    {
                        '/roles': <RoleView id={props.id} />,
                        '/departments': <DepartmentView id={props.id}/>
                    }[path]
                }
            </Dialog>
        </ React.Fragment>
    );
}