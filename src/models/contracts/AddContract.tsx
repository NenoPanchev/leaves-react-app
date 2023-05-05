import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Autocomplete, Tooltip, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCreate } from '../../services/contractService';
import { IContractAddButtonProps } from '../interfaces/contract/IContractAddButtonProps';

export default function AddContractButton(props: IContractAddButtonProps) {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState<string>('');
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const addContract = useCreate();
    const { t } = useTranslation();

    const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
    const [typeNameError, setTypeNameError] = React.useState<boolean>(false);
    const [endDateError, setEndDateError] = React.useState<boolean>(false);
    const [serverError, setServerError] = React.useState<boolean>(false);

    let tnError = false;
    let edError = false;
    let sError = false;
    let typeNames = props.typeNames;
    let serverResponse = '';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        appendDatesToFormData(data, startDate, endDate);
        let errors = validate();

        if (errors) {
            return;
        }
        
        serverResponse = await addContract(data, props.userId);
        setServerErrorMessage(serverResponse);
        errors = validate();

        if (errors) {
            return;
        }
        props.setRefreshCounter(props.refreshCounter + 1);
        handleClose();
    }

    function appendDatesToFormData(formData: FormData, startDate: Dayjs | null, endDate: Dayjs | null) {

        let startDateString = startDate ? startDate.format('DD.MM.YYYY') : null;
        let endDateString = endDate ? endDate.format('DD.MM.YYYY') : null;

        formData.append('[startDate]', startDateString!)
        if (endDateString) {
            formData.append('[endDate]', endDateString!)
        }
    }

    function validate(): boolean {       
        tnError = position === '';
        setTypeNameError(position === '');        

        if (endDate) {
            edError = endDate!.isBefore(startDate);
            setEndDateError(edError);
        }

        sError = serverResponse !== '';
        setServerError(serverResponse !== '');

        return tnError || edError || sError;
    }

    return (
        <React.Fragment>
            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                <Typography variant="overline" component="div">
                    {t(`Add contract`)}
                </Typography>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {t('Add') + t('Contract')}
                </DialogTitle>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <DialogContent>
                        {typeNameError &&
                            <Typography component="h2" variant="subtitle2" color="red" align='center'>{'You must choose a position'}</Typography>
                        }
                        <Autocomplete
                            id="typeName"
                            options={typeNames}
                            size='medium'
                            filterSelectedOptions
                            sx={{ minWidth: '20%' }}
                            value={position}
                            onChange={(event, newValue) => {
                                setPosition(newValue!);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name='typeName'
                                    margin='normal'
                                    label={t('Position')}
                                    placeholder={t('Position')!}
                                />
                            )}

                        />
                        {serverError &&
                            <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography>
                        }
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                            <DatePicker label={t('Start date')}
                                value={startDate}
                                sx={{ marginTop: '15px', marginBottom: '5px' }}
                                onChange={(newValue) => setStartDate(newValue)} />
                        </LocalizationProvider>
                        {endDateError &&
                            <Typography component="h2" variant="subtitle2" color="red" align='center'>{'End date must be after start date'}</Typography>
                        }
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                            <DatePicker label={t('End date')}
                                value={endDate}
                                slotProps={{
                                    actionBar: {
                                        actions: ['clear']
                                    }
                                }}
                                sx={{ marginTop: '15px', marginBottom: '5px' }}
                                onChange={(newValue) => setEndDate(newValue)} />
                        </LocalizationProvider>
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
            </Dialog>
        </ React.Fragment>
    );
}