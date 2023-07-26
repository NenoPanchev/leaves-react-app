import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
type AddFilterProps = {
    buttonName: string,
    nameOfField: string,
    onChange: (newValue: string) => void;
}
const MyAddFilterRequestType: React.FC<AddFilterProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [value, setVlaue] = React.useState('');
    const [t] = useTranslation();

    const onSubmit = async (e: { preventDefault: () => void; }) => {

        props.onChange(value);
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
                        <FormControl sx={{ mt: 2, minWidth: 180 }}>
                            <InputLabel id="demo-simple-select-label">{t('Requests.RequestType')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="my-input"
                                value={value}
                                label={t('Requests.RequestType')}
                                onChange={(event) => setVlaue(event.target.value)}
                            >

                                <MenuItem value={''}>{t('All')}</MenuItem>
                                <MenuItem value={"LEAVE"}>{t('Leave')}</MenuItem>
                                <MenuItem value={"HOME_OFFICE"}>{t('Home office')}</MenuItem>
                            </Select>
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
export default MyAddFilterRequestType;