import { Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { t } from 'i18next';
import * as React from 'react';
type AddTypeAlertProps = {
    message: String,
    open:boolean,
    
}
const AddTypeAlert: React.FC<AddTypeAlertProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(props.open);

    const handleClose = () => {
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
                        
                            <Typography style={{ whiteSpace: 'pre-line' }} >
                            {props.message}
                        </Typography>
                        
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
export default AddTypeAlert;