import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import PreviewIcon from '@mui/icons-material/Preview';
import RoleView from '../../models/roles/RoleView';
import DepartmentView from '../../models/departments/DepartmentView';
import UserView from '../../models/users/UserView';
import { ViewProps } from '../../models/interfaces/common/commonInterfaces';


export default function ViewButton(props: ViewProps) {
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
            <GridActionsCellItem
                icon={<PreviewIcon />}
                label="View"
                onClick={handleClickOpen}
            />

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
                        '/departments': <DepartmentView id={props.id} />,
                        '/users': <UserView id={props.id} />,
                    }[path]
                }
            </Dialog>
        </ React.Fragment>
    );
}