import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogContent, DialogActions, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
type AddFilterProps = {
    buttonName: string,
    nameOfField: string,
    onChange: (newValue: any) => void;
}
const MyAddFilterDate: React.FC<AddFilterProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const[date,SetDate]=useState<Dayjs | null>(dayjs());
    let valueDate:any;
    const[t]=useTranslation();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        if (date == null) return null;
        props.onChange(date.format('YYYY-MM-DD'));

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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={date}  onChange={(newValue) => SetDate(newValue)}  />
                        </LocalizationProvider>

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
export default MyAddFilterDate;