import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { appendEmployeeInfoToFormData, appendRolesToFormData, useEdit } from '../../services/userService';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function EditUserButton() {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const userId = React.useContext(AuthContext).user?.getId()!;
    const { t } = useTranslation();
    const [oldPasswordError, setOldPasswordError] = React.useState(false);
    const [newPasswordError, setNewPasswordError] = React.useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
    let opError = false;
    let npError = false;
    let pcError = false;
    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
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
        const errors = validate();
        if (errors) {
            return;
        }
        editUser(userId, data)
            .then(() => navigate(path))
        handleClose();

    }

    function validate(): boolean {
        setOldPasswordError((password.length < 4 || password.length > 20));
        opError = ((password.length < 4 || password.length > 20));

        setNewPasswordError((password.length < 4 || password.length > 20));
        npError = ((password.length < 4 || password.length > 20));

        setPasswordConfirmError(password !== passwordConfirm);
        pcError = (password !== passwordConfirm);

        return opError || npError || pcError;
    }

    return (
        <React.Fragment>
            <ListItemButton 
            onClick={handleClickOpen}>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ ListItemIcon>
                    < ListItemText primary={t('Change Password')}/>
            </ListItemButton>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <React.Fragment>

                    <DialogTitle id="form-dialog-title">
                        {t('Change Password')}
                    </DialogTitle>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <DialogContent>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="oldPassword"
                                label={t('Old Password')}
                                type="password"
                                id="oldPassword"
                                autoComplete="oldPassword"
                                onChange={(e) => setPassword(e.target.value)}
                                error={newPasswordError}
                                helperText={newPasswordError ? t('Password must be between 4 and 20 characters') : null}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('New Password')}
                                type="password"
                                id="password"
                                autoComplete="password"
                                onChange={(e) => setPassword(e.target.value)}
                                error={newPasswordError}
                                helperText={newPasswordError ? t('Password must be between 4 and 20 characters') : null}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label={t('New Password Confirm')}
                                type="password"
                                id="confirm-password"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                error={passwordConfirmError}
                                helperText={passwordConfirmError ? t('Passwords must match!') : null}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                {t('Close')}
                            </Button>
                            <Button
                                type='submit'
                                autoFocus>
                                {t('Submit')}
                            </Button>
                        </DialogActions>
                    </Box>
                </ React.Fragment>

            </Dialog>
        </ React.Fragment>
    );
}