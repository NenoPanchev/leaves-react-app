import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, ListItemButton, ListItemIcon, ListItemText, Typography
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { changePasswordClick, useChangePassword } from '../../services/userService';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function ChangePasswordButton() {
    const path = useLocation().pathname;
    const [open, setOpen] = React.useState(false);
    const { user } = React.useContext(AuthContext);
    const userId = user?.getId()!;
    const { t } = useTranslation();
    const [oldPasswordError, setOldPasswordError] = React.useState(false);
    const [newPasswordError, setNewPasswordError] = React.useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
    let responseMessage = '';
    let opError = false;
    let npError = false;
    let pcError = false;
    let sError = false;
    const [token, setToken] = React.useState<string>('');
    const [oldPassword, setOldPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<boolean>(false);
    const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
    const navigate = useNavigate();
    const changePassword = useChangePassword();


    const handleClickOpen = () => {
        changePasswordClick(userId) 
        .then((response: any) => {
            // setRows(response.data);
            //TODO ALERT MSG
          })
          .catch((e: Error) => {
            console.log(e);
          });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        responseMessage = await changePassword(userId, data);
        setServerErrorMessage(responseMessage);

        const errors = validate();
        if (errors) {
            return;
        }

        handleClose();
        navigate(path);
    }

    function validate(): boolean {
        setOldPasswordError((oldPassword.length < 4 || oldPassword.length > 20));
        opError = ((oldPassword.length < 4 || oldPassword.length > 20));

        setNewPasswordError((newPassword.length < 4 || newPassword.length > 20));
        npError = ((newPassword.length < 4 || newPassword.length > 20));

        setPasswordConfirmError(newPassword !== newPasswordConfirm);
        pcError = (newPassword !== newPasswordConfirm);

        setServerError(responseMessage != '');
        sError = responseMessage != '';

        return opError || npError || pcError || sError;
    }

    return (
        <React.Fragment>
            <ListItemButton
                onClick={handleClickOpen}>
                <ListItemIcon>
                    <SettingsIcon />
                </ ListItemIcon>
                < ListItemText primary={t('Change Password')} />
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
                            {serverError &&
                                <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography>
                            }
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="oldPassword"
                                label={t('Old Password')}
                                type="password"
                                id="old-password"
                                autoComplete="oldPassword"
                                onChange={(e) => setOldPassword(e.target.value)}
                                error={oldPasswordError}
                                helperText={oldPasswordError ? t('Password must be between 4 and 20 characters') : null}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                label={t('New Password')}
                                type="password"
                                id="new-password"
                                autoComplete="newPassword"
                                onChange={(e) => setNewPassword(e.target.value)}
                                error={newPasswordError}
                                helperText={newPasswordError ? t('Password must be between 4 and 20 characters') : null}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newPasswordConfirm"
                                label={t('New Password Confirm')}
                                type="password"
                                id="confirm-password"
                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                error={passwordConfirmError}
                                helperText={passwordConfirmError ? t('Passwords must match!') : null}
                            />
                             <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="token"
                                label={t('token')}
                                type="text"
                                id="token"
                                onChange={(e) => setToken(e.target.value)}
                                helperText={t('checkEmailForToken')}
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