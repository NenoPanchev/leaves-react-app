import { Button, Dialog, DialogActions, DialogContent, Grid, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import RequestService from '../../services/RequestService';
import IRequestPost from '../interfaces/request/IRequestDataPost';
import DialogAlerts from '../../components/Alert/DialogAlerts';
import IAlertProps from '../interfaces/errors/IAlertProps';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/bg';

const AddRequest3: React.FC = (): JSX.Element => {
    const initialRequestState = {
        startDate: dayjs(),
        endDate: dayjs(),
    };
    const [open, setOpen] = React.useState(false);
    const [t] = useTranslation();

    const [startDate, SetStartDate] = React.useState<Dayjs | null>(dayjs());
    const [endDate, SetEndDate] = React.useState<Dayjs | null>(dayjs());
    const [request, setRequest] = React.useState<IRequestPost>(initialRequestState);
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
        request.startDate = startDate;
        request.endDate = endDate;

        RequestService.create(request)
            .then((response: any) => {
                setRequest({
                    startDate: response.data.startDate,
                    endDate: response.data.endDate
                });
                setSubmitted(true);
                setAlertProps({ ...alertProps, open: true })
                console.log(response.data);
            })
            .catch((e: AxiosError<any, any>) => {
                if (e.response) {
                    console.log(e.response);
                    setAlertProps({ ...alertProps, message: e.response.data.message, hasError: true, open: true, type: e.response.data.type })
                    console.log(alertProps);
                    setSubmitted(true);
                }
            });
    };
    React.useEffect(() => {
        SetEndDate(startDate);
    }, [startDate]);

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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClickOpen}
            sx={{paddingTop: '12px', paddingBottom: '12px'}}>
          <ListItemIcon>
          <PlaylistAddIcon />
          </ListItemIcon>
          <Typography color="black"   >
          {t('AddRequests.AddRequest')}
          </Typography>
        </ListItemButton>
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
                            submitted ? (
                                <DialogAlerts {...AddRequestAlertProps}></DialogAlerts>
                            ) : (


                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!} >
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
                                            <DatePicker value={startDate} onChange={(newValue) => SetStartDate(newValue)} />
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
                                            <DatePicker value={endDate} onChange={(newValue) => SetEndDate(newValue)} />
                                        </Grid>

                                    </Grid>
                                </LocalizationProvider>


                            )}

                    </Box>

                </DialogContent>
                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid >
                        <DialogActions>
                            <Button onClick={saveRequest} >{t('Add')}</Button>
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
export default AddRequest3;