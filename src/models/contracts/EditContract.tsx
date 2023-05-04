import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Autocomplete, Tooltip, Typography
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEdit } from '../../services/contractService';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IContractEditButtonProps } from '../interfaces/contract/IContracteditButtonProps';

export default function EditContractButton(props: IContractEditButtonProps) {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState<string>(props.contract.typeName);
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(props.contract.startDate, 'DD.MM.YYYY'));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(props.contract.endDate, 'DD.MM.YYYY'));
    const editContract = useEdit();
    const { t } = useTranslation();
    
    const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<boolean>(false);

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
        console.log(data);
        
        serverResponse = await editContract(props.contract.id, data);
        setServerErrorMessage(serverResponse);
        let errors = validate();

        if (errors) {
            return;
        }
        props.setRefreshCounter(props.refreshCounter + 1);
        handleClose();
    }

    function appendDatesToFormData(formData: FormData, startDate: Dayjs | null, endDate: Dayjs | null) {

        let startDateString = startDate? startDate.format('DD.MM.YYYY') : null;
        let endDateString = endDate? endDate.format('DD.MM.YYYY') : null;

        formData.append('[startDate]', startDateString!)
        if (endDateString) {
            formData.append('[endDate]', endDateString!)
        }
      }

    function validate(): boolean {

        sError = serverResponse !== '';
        setServerError(serverResponse !== '');

        return sError;
    }

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Tooltip title={t('edit')}><EditIcon /></Tooltip>}
                label={t('Edit')}
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <React.Fragment>

                    <DialogTitle id="form-dialog-title">
                        {t('Edit') + t('Contract')}
                    </DialogTitle>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <DialogContent>
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
                </ React.Fragment>

            </Dialog>
        </ React.Fragment>
    );
}