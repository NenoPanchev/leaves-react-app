import { Alert, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IAlertProps from '../../models/interfaces/errors/IAlertProps';
type AddRequestAlertProps = {
    alertPropsChild: IAlertProps,
    onClose: (newValue: boolean) => void;
}
const DialogAlerts: React.FC<AddRequestAlertProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(props.alertPropsChild.open);
    const[t]=useTranslation();
    let sMessage: string = "";
    let eMessage: string = "";
    let TypeMessage: string = "";
    if (props.alertPropsChild.hasError) {

        getDateFromString(props.alertPropsChild.message);
    }

    const handleClose = () => {
        props.onClose(false);
        props.alertPropsChild.hasError = false;
        setOpen(false);
    };
    function renderRequestAlert(type: string) {

        if (type === "Add") {
            if (TypeMessage === "Duplicate") {
                return (
                    <Alert severity="warning">
                    <Typography style={{ whiteSpace: 'pre-line' }} >
                        {t('alertMassageDuplicateEntity', { startDate: sMessage, endDate: eMessage })}
                    </Typography>
                    </Alert>
                )
            } else
                if (TypeMessage === "NotEnough") {
                    return (
                        <Alert severity="warning">
                        <Typography style={{ whiteSpace: 'pre-line' }} >
                            {t('alertMassagePaidLeave', { daysRequested: sMessage, leftDays: eMessage })}
                        </Typography >
                        </Alert>
                    )
                } else
                    if (TypeMessage === "Zero") {
                        return (
                            <Alert severity="warning">
                            <Typography style={{ whiteSpace: 'pre-line' }} >
                                {t('alertMassagePaidLeaveZero')}
                            </Typography>
                            </Alert>
                        )
                    } else {
                        return (
                            <Alert severity="warning">
                            <Typography style={{ whiteSpace: 'pre-line' }} >
                                Something went wrong!
                            </Typography>
                            </Alert>
                        )
                    }
        }
        console.log("sadsadsa")
    }

    function renderRequest(isError: boolean) {
        if (isError) {
            return renderRequestAlert(props.alertPropsChild.type)
        }

        return (
            <Alert severity="success">
            <Typography style={{ whiteSpace: 'pre-line' }} >
                {t('alertAddSuccess', { startDate: sMessage, endDate: eMessage })}
            </Typography>
            </Alert>)

    }



    function getDateFromString(txt: string) {
        let txtArr: string[];
        txtArr = txt.split('|');
        if (txtArr.length > 1) {
            TypeMessage = "Duplicate"
            sMessage = txtArr[0];
            eMessage = txtArr[1];
        } else {

            txtArr = txt.split('@');
            sMessage = txtArr[0];
            eMessage = txtArr[1];
            if (+sMessage > 0) {
                TypeMessage = "NotEnough"
            }
            else {
                TypeMessage = "Zero"
            }
        }

    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>

                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}>
                          
                        {    
                            renderRequest(props.alertPropsChild.hasError)
                                             
                                              }      
                    </Box>
                </DialogContent>
                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid>
                        <DialogActions>
                            <Button onClick={handleClose} >{t('Close')}</Button>
                        </DialogActions>
                    </Grid >
                </Grid >

            </Dialog>
        </React.Fragment>
    );
}
export default DialogAlerts;