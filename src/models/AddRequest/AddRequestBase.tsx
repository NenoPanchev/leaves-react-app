
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/bg';
import 'dayjs/locale/en-gb';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import DialogAlerts from '../../components/Alert/DialogAlerts';
import RequestService from '../../services/RequestService';
import IAlertProps from '../interfaces/errors/IAlertProps';
import IRequestPostString from '../interfaces/request/IRequestDataPostString';
type AddRequestBaseProps = {

    onSubmit: () => void;
    onClose: () => void;
    initialStartDate: Dayjs | null;
    initialendDate: Dayjs | null;

}

export interface AddRequestBaseRef {
    onCalendarChange: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

const AddRequestBase = (props: AddRequestBaseProps, ref: React.ForwardedRef<AddRequestBaseRef>): JSX.Element => {
    const initialRequestState = {
        requestType: 'LEAVE',
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
    };
    const [t, i18n] = useTranslation();

    const [requestType, setRequestType] = React.useState<string>('LEAVE');
    const [startDate, setStartDate] = React.useState<Dayjs | null>(props.initialStartDate);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(props.initialendDate);
    const [request, setRequest] = React.useState<IRequestPostString>(initialRequestState);
    const [submitted, setSubmitted] = React.useState<boolean>(false);
    const [alertProps, setAlertProps] = React.useState<IAlertProps>(
        {
            hasError: false,
            message: "",
            type: "",
            open: false
        }
    );
    let value: any;

    const saveRequest = () => {
        request.requestType = requestType;
        request.startDate = startDate?.format("YYYY-MM-DD")!;
        request.endDate = endDate?.format("YYYY-MM-DD")!;
        RequestService.createRequestString(request)
            .then((response: any) => {
                setRequest({
                    requestType: response.data.requestType,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate
                });
                setSubmitted(true);

                setAlertProps({ ...alertProps, open: true })
            })
            .catch((e: AxiosError<any, any>) => {
                if (e.response) {
                    setAlertProps({ ...alertProps, message: e.response.data.message, hasError: true, open: true, type: e.response.data.type })
                    setSubmitted(true);
                }
            });
    };
    React.useImperativeHandle(ref, () => {
        return {
            onCalendarChange: setRange
        }

    }, [])


    function onStartDateChange(startDate: Dayjs | null) {
        setStartDate(startDate);
        setEndDate(startDate);
    }


    function setRange(startDates: Dayjs | null, endDates: Dayjs | null) {
        setStartDate(startDates);
        setEndDate(endDates);
    }

    React.useEffect(() => {

        props.onSubmit();
    }, [submitted]);


    function updateParent(newValue: boolean) {
        setSubmitted(newValue);
        setAlertProps({ ...alertProps, hasError: false });
    }
    const updateSubmitted = React.useCallback(

        (newValue: boolean): void => updateParent(newValue),


        [setSubmitted, setAlertProps]


    );
    const AddRequestAlertProps = {
        alertPropsChild: { ...alertProps },
        onClose: updateSubmitted
    }

    const handleClose = () => {
        props.onClose()
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = (event.target as HTMLInputElement).value;
        setRequestType(value);
    }

    return (
        <React.Fragment>
            <Grid>
                <Box
                    noValidate
                    component="form"
                    marginBottom="auto"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                    }}>

                    {
                        submitted ? (


                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                                <DialogAlerts {...AddRequestAlertProps}></DialogAlerts>
                                <Grid container direction="column"  >

                                    <Grid container direction="row" justifyContent="right" marginBottom={1}>
                                        <Typography
                                            variant='overline'
                                            marginTop="auto"
                                            marginBottom="auto"
                                            marginRight={1}
                                        >
                                            {t('from')}
                                        </Typography>
                                        <DatePicker slotProps={{ textField: { size: 'small' } }}
                                            minDate={dayjs()}
                                            disableOpenPicker
                                            value={startDate}
                                            disabled
                                            onChange={(newValue) => onStartDateChange(newValue)} />
                                    </Grid>

                                    <Grid container direction="row" justifyContent="right" >
                                        <Typography
                                            variant='overline'
                                            marginTop="auto"
                                            marginBottom="auto"
                                            marginRight={1}
                                        >
                                            {t('to')}
                                        </Typography>
                                        <DatePicker slotProps={{ textField: { size: 'small' } }}
                                            disablePast={true}
                                            disableOpenPicker
                                            disabled
                                            value={endDate}
                                            onChange={(newValue) => setEndDate(newValue)} />
                                    </Grid>


                                </Grid>
                            </LocalizationProvider>
                        ) : (


                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
                                <Grid container direction="column"  >
                                    <Grid container direction="row" justifyContent="right" marginBottom={1}>
                                        <FormControl>
                                            <FormLabel id="demo-controlled-radio-buttons-group">{t('Requests.RequestType')}</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={requestType}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="LEAVE" control={<Radio />} label={t('Leave')} />
                                                <FormControlLabel value="HOME_OFFICE" control={<Radio />} label={t('Home office')} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <Grid container direction="row" justifyContent="right" marginBottom={1}>
                                        <Typography
                                            variant='overline'
                                            marginTop="auto"
                                            marginBottom="auto"
                                            marginRight={1}
                                        >
                                            {t('from')}
                                        </Typography>
                                        <DatePicker slotProps={{ textField: { size: 'small' } }}
                                            minDate={dayjs()}
                                            value={startDate}
                                            disableOpenPicker
                                            disabled
                                            onChange={(newValue) => onStartDateChange(newValue)} />
                                    </Grid>

                                    <Grid container direction="row" justifyContent="right" >
                                        <Typography
                                            variant='overline'
                                            marginTop="auto"
                                            marginBottom="auto"
                                            marginRight={1}
                                        >
                                            {t('to')}
                                        </Typography>
                                        <DatePicker slotProps={{ textField: { size: 'small' } }}
                                            minDate={endDate}
                                            disableOpenPicker
                                            value={endDate}
                                            disabled
                                            onChange={(newValue) => setEndDate(newValue)} />
                                    </Grid>

                                </Grid>
                            </LocalizationProvider>


                        )}

                </Box>


                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    marginTop="1em">
                    <Grid >
                        <Button onClick={saveRequest} >{t('Add')}</Button>
                    </Grid >
                    <Grid >
                        <Button onClick={handleClose} >{t('Close')}</Button>
                    </Grid >
                </Grid >
            </Grid>
        </React.Fragment>
    );
}
export default React.forwardRef(AddRequestBase);