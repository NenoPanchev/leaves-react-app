import { Alert, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IAlertProps from '../../models/interfaces/errors/IAlertProps';
type ApproveDialogAlerts = {
    alertPropsChild: IAlertProps
    onClose: (newValue: boolean) => void;
}
const ApproveDialogAlerts: React.FC<ApproveDialogAlerts> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(props.alertPropsChild.open);
    const [t] = useTranslation();

    const handleClose = () => {
        props.onClose(false);
        setOpen(false);
    };
    function renderRequestAlert(type: string) {
        if (type === "Approve") {
            return (
                <Alert severity="warning">
                    <Typography style={{ whiteSpace: 'pre-line' }} >
                        {t('alertRequestProcessed', { id: props.alertPropsChild.message })}
                    </Typography>
                </Alert>
            )

        }
        return (
            <Alert severity="warning">
                <Typography style={{ whiteSpace: 'pre-line' }} >
                    {t('wentWrongAlert')}
                </Typography>
            </Alert>
        )

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
                            renderRequestAlert(props.alertPropsChild.type)
                        }



                    </Box>

                </DialogContent>
                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid >
                        <DialogActions>
                            <Button onClick={handleClose} >{t('Close')}</Button>
                        </DialogActions>
                    </Grid >
                </Grid >

            </Dialog>
        </React.Fragment>
    );
}
export default ApproveDialogAlerts;