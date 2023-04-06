import { Alert, Button, Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { t } from 'i18next';
import * as React from 'react';
type BasicDialogAlertProps = {
    message: String,
    open:boolean,
    onClose: (newValue: boolean) => void;
}
const BasicDialogAlert: React.FC<BasicDialogAlertProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(props.open);

    const handleClose = () => {
        props.onClose(false);
        setOpen(false);
    };
 
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

                            <Alert severity="warning"> {props.message}</Alert> 

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
export default BasicDialogAlert;