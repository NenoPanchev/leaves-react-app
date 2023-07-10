import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogContent, FormControl, Input, FormHelperText, DialogActions, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
type AddFilterProps = {
    buttonName: string,
    nameOfField: string,
    onChange: (newValue: string) => void;
}
const MyAddFilter: React.FC<AddFilterProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    let value: string = "";
    const [t, i18n] = useTranslation();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        if (!!!(value === "")) {
            props.onChange(value);
        }

        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                {props.buttonName}
            </Button>
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

                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <Input id="my-input" aria-describedby="my-helper-text" defaultValue={value} onChange={(event) => value = event.target.value} />
                            <FormHelperText id="my-helper-text">{props.nameOfField}</FormHelperText>
                        </FormControl>

                    </Box>

                </DialogContent>
                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid >
                        <DialogActions>
                            <Button onClick={onSubmit} >{t('Add')}</Button>
                        </DialogActions>
                    </Grid >
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
export default MyAddFilter;