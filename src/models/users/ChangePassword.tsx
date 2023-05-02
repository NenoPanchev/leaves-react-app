import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, ListItemButton, ListItemIcon, ListItemText, Typography, Grid, Stepper
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { changePasswordClick, useChangePassword, validateUserPassowrById } from '../../services/userService';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect } from 'react';
import { AxiosError } from 'axios';





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
    const [hasError, sethasError] = React.useState<boolean>(true);
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const changePassword = useChangePassword();

    const steps = [t('Old Password'), t('New Password'), t('Token')];

    const handleClickOpen = () => {
        setActiveStep(0)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log("handleClose")
        setToken('');
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
        setServerErrorMessage('');
        setServerError(false);
        sethasError(true);
 
    };

 useEffect(() => {

    setToken('');
    setOldPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setServerErrorMessage('');
    setServerError(false);
    sethasError(true);
 
   }, [open]);



    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.set('oldPassword', oldPassword);
        data.set('newPassword', newPassword);
        data.set('newPasswordConfirm', newPasswordConfirm);
        data.set('token', token);
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

        //NOT CORRECT
        return opError || npError || pcError || sError;
    }


    function renderOldPasswordField() {


        return <TextField
            margin="normal"
            required
            size="medium"
            sx={{ width: "50%", marginLeft: "25%" }}
            name="oldPassword"
            label={t('Old Password')}
            type="password"
            id="old-password"
            autoComplete="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={oldPasswordError}
            helperText={oldPasswordError ? t('Password must be between 4 and 20 characters') : null}
        />
    }

    function renderNewPasswordFields() {


        return <Grid>
            <TextField
                margin="normal"
                required
                sx={{ width: "50%", marginLeft: "25%" }}
                name="newPassword"
                label={t('New Password')}
                type="password"
                id="new-password"
                value={newPassword}
                autoComplete="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                error={newPasswordError}
                helperText={newPasswordError ? t('Password must be between 4 and 20 characters') : null}
            />
            <TextField
                margin="normal"
                required
                value={newPasswordConfirm}
                sx={{ width: "50%", marginLeft: "25%" }}
                name="newPasswordConfirm"
                label={t('New Password Confirm')}
                type="password"
                id="confirm-password"
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                error={passwordConfirmError}
                helperText={passwordConfirmError ? t('Passwords must match!') : null}
            /></Grid>
    }


    function renderTokenField() {


        return <TextField

            margin="normal"
            required
            sx={{ width: "50%", marginLeft: "25%" }}
            name="Token"
            label={t('Token')}
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            helperText={t('checkEmailForToken')}
        />
    }



    const stepsElement: Array<JSX.Element> = [
        renderOldPasswordField(),
        renderNewPasswordFields(),
        renderTokenField()
    ]

    const handleNext = async () => {
        if(activeStep===0)
        {
       await     validateUserPassowrById(userId,oldPassword)
            .then((response: any) => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            })
            .catch((e: AxiosError<any, any>) => {
                // if (e.response) {
                console.log(e)
                setServerErrorMessage(e.response!.data.message)
                
                setServerError(true);
              })
              console.log("a1")

        }else if (activeStep === steps.length - 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            changePasswordClick(userId)
                .then((response: any) => {
                    //TODO ALERT MSG
                    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
                
                })
                .catch((e: Error) => {
                    console.log(e);
                });
                console.log(userId)
        }
        else
        {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            console.log("a3")
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

  useEffect(() => {
   validate()

  }, [token,oldPassword,newPassword,newPasswordConfirm]);

  useEffect(() => {

   sethasError(oldPasswordError)
 
   }, [oldPasswordError]);

   useEffect(() => {

    sethasError(newPasswordConfirm!==newPassword||newPasswordError)

    }, [newPasswordConfirm,newPassword]);

    useEffect(() => {

        setServerErrorMessage('');
        setServerError(false);
        // sethasError(true);
     
       }, [activeStep]);
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
                maxWidth='lg'

                aria-labelledby="form-dialog-title"
            >
                <Grid container width="100%"
                    alignItems="center"
                    justifyContent="center">
                    <DialogTitle id="form-dialog-title">
                        {t('Change Password')}
                    </DialogTitle>
                </Grid>



                <Grid component="form" container onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} justifyItems="center" alignItems="center">
                    <DialogContent>
                        <Grid item marginLeft="auto" marginRight="auto" width="100vh">
                            <Grid container direction="column" justifySelf="center">

                                <Box sx={{ width: '100%' }}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            const stepProps: { completed?: boolean } = {};
                                            const labelProps: {
                                            } = {};

                                            return (
                                                <Step key={index} {...stepProps}>
                                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );

                                        })}
                                    </Stepper>
                                    {activeStep === steps.length ? (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleReset}>Reset</Button>
                                            </Box>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                                            {serverError &&
                                                <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography>
                                            }
         {/* <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography> */}

                                            {/* Text fields */}
                                            {stepsElement[activeStep]}
                                            {/* Text fields */}


                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                {activeStep === steps.length - 1 ? (
                                                    <Button key={'Submit'}
                                                        type='submit'
                                                        autoFocus>
                                                        {t('Submit')}
                                                    </Button>
                                                ) : (
                                                    <Button key={'Next'} disabled={hasError} onClick={handleNext}>
                                                        Next
                                                    </Button>
                                                )
                                                }
                                            </Box>
                                        </React.Fragment>
                                    )}
                                </Box>

                            </Grid>
                        </Grid>
                    </DialogContent>
                </Grid>
            </Dialog>
        </ React.Fragment>
    );
}