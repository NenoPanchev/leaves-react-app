import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useDelete } from '../../services/deleteService';
import { GridActionsCellItem } from '@mui/x-data-grid';


import RoleView from '../../models/roles/RoleView';
import DepartmentView from '../../models/departments/DepartmentView';
import UserView from '../../models/users/UserView';
import AuthContext from '../../contexts/AuthContext';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { useTranslation } from 'react-i18next';
import { IDeleteButtonProps } from '../../models/interfaces/common/IDeleteButtonProps';

export default function DeleteButton(props: IDeleteButtonProps) {
    let path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [t] = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const deleteItem = useDelete({path: path});
    const {user} = React.useContext(AuthContext);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    function handleDelete() {
        deleteItem(props.id)
        .then(() => props.refresh(props.refreshCurrentState + 1))
    }

    if (!user?.hasAuthority('DELETE') || (props.id == 1 && path != '/departments')) {
        return null;
    }

    
    
    return (
        <React.Fragment>
            <GridActionsCellItem
          icon={<Tooltip title={t('delete')}><DeleteIcon /></Tooltip>}
          label="Delete"
          color='error'
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
                <React.Fragment>
                    <DialogTitle id="responsive-dialog-title">
                        {"Do you really want to delete this item?"}
                    </DialogTitle>
                    <DialogContent>
                        
                            {
                                {
                                    '/roles': <RoleView id={props.id} />,
                                    '/departments': <DepartmentView id={props.id} />,
                                    '/users': <UserView id={props.id} />,
                                }[path]
                            }
                        
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={() => {
                            handleClose();
                            handleDelete();
                        }} autoFocus style={{ color: 'red' }}>
                            Delete
                        </Button>
                    </DialogActions>

                </ React.Fragment>

            </Dialog>
        </ React.Fragment>
    );
}