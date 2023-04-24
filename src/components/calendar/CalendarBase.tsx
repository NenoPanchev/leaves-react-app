import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WeekendIcon from '@mui/icons-material/Weekend';
import { Avatar, Grid, Typography } from '@mui/material';
import { blue, green, purple, red } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/bg';
import 'dayjs/locale/en-gb';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';
import HolidayService from '../../services/HolidayService';
import RequestService from '../../services/RequestService';
import BasicDialogAlert from '../Alert/BasicDialogAlert';
import PdfFormRequest from '../pdfForm/PdfFormRequest';
import { Day, disableWeekends } from './CalendarStyleComponent';
import { DayWithRange } from './CalendarStyleComponentWithRange';

dayjs.extend(isBetweenPlugin);
export interface CalendarBaseRef {
    reload: () => void;
}
type CustomDayProps = {
    onDateChange: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

const alertMassage = "You can not download Pdf of a request that is not approved!";
const CustomDay = (props: CustomDayProps, ref: React.ForwardedRef<CalendarBaseRef>): JSX.Element => {
    const [leaveRequests, setLeaveRequests] = React.useState<Array<IRequestDataGet>>([]);
    const [holidays, setHolidays] = React.useState<Array<string>>([]);
    const [t, i18n] = useTranslation();
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);

    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());

    const [isRequest, setIsRequest] = React.useState<boolean>(false);
    const [leaveRequest, setLeaveRequest] = React.useState<IRequestDataGet>({

        id: -1,
        startDate: "",
        endDate: "",
        approvedStartDate: "",
        approvedEndDate: "",
        approved: false,
        createdBy: "",
        daysRequested: 0,
        isDeleted: false
    });
    const [openForm, setOpen] = useState<boolean>(false);
    const ChildMemo = React.memo(PdfFormRequest);
    const AlertMemo = React.memo(BasicDialogAlert);

    React.useImperativeHandle(ref, () => {
        return {
            reload: retrivePage
        }
    }, [])

    React.useEffect(() => {
        retrivePage();
        retriveHolidays();
    }, [setLeaveRequest]);


    const updateFormOpen = React.useCallback(

        (newValue: boolean): void => setOpen(newValue),

        [setOpen]
    );
    const updateAlertOpen = React.useCallback(

        (newValue: boolean): void => setOpenAlert(newValue),

        [setOpenAlert]
    );

    function openRequest(newValue: dayjs.Dayjs | null) {

        for (const element of leaveRequests) {

            if (element.approved) {
                if (newValue?.isBetween(element.startDate, element.endDate, null, '[]')) {
                    console.log("asdasdasd")
                    setLeaveRequest(element);
                    setOpen(true);
                    console.log("ghhghghghghgh")
                    return false;
                }
                if (newValue?.isSame(element.endDate, 'day')) {
                    setLeaveRequest(element);
                    setOpen(true);
                    return false;
                }
            }
            else if (element.approved == null || element.approved == false) {
                if (newValue?.isSame(element.endDate, 'day') || newValue?.isBetween(element.startDate, element.endDate, null, '[]')) {
                    setOpen(false);
                    setOpenAlert(true);

                    return false;
                }
            }

            if (dayjs(element.startDate).isBetween(startDate, newValue, null, '[]') || dayjs(element.endDate).isBetween(startDate, newValue, null, '[]')) {
                setStartDate(newValue);
                setEndDate(newValue);
                return false;
            }
        }
        return true;
    }


    const handleChange = (newValue: dayjs.Dayjs | null) => {

        if (openRequest(newValue)) {
            if (newValue?.isSame(endDate)) {
                console.log("end date")
                setStartDate(newValue)
            }
            if (newValue?.isSame(startDate)) {
                console.log("end date")
                setEndDate(newValue)
                setStartDate(newValue)
            }
            if (newValue?.isAfter(startDate)) {
                console.log("set end date")
                setEndDate(newValue)
            }

            if (newValue?.isBefore(startDate)) {
                console.log("set end date")
                setStartDate(newValue)
                setEndDate(newValue)
            }
        }





        // if(startDate!=dayjs())
        // {
        //     console.log("startDate date")
        //     setStartDate(newValue)
        //     setEndDate(newValue)
        // }else
        // {
        //     console.log("startDateaAAaAa date")
        //     setEndDate(newValue)
        // }

    };

    React.useEffect(() => {
        props.onDateChange(startDate, endDate);
    }, [startDate, endDate]);

    const retrivePage = async () => {
        await RequestService.getAllByUser()
            .then((response: any) => {
                setLeaveRequests(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const retriveHolidays = async () => {
        await HolidayService.getAll()
            .then((response: any) => {
                setHolidays(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    return (
        <Grid item>
            <AlertMemo message={alertMassage} open={openAlert} onClose={updateAlertOpen}></AlertMemo>
            <ChildMemo open={openForm} onClose={updateFormOpen} leaveRequest={leaveRequest} />
            <Grid container direction="row" sx={{ width: 'flex' }} >
                <Grid item >

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!}>
                        <DateCalendar
                            sx={{}}
                            slots={{ day: DayWithRange }}
                            slotProps={{
                                day: {
                                    requests: leaveRequests,
                                    holidays: holidays,
                                    startDate: startDate,
                                    endDate: endDate
                                } as any,
                            }}
                            shouldDisableDate={disableWeekends}
                            onChange={(newValue) => handleChange(newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item marginTop="auto" marginBottom="auto">

                    <Grid container direction="row" marginBottom={2}  >
                        <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: green[300] }}><CheckIcon /></Avatar>
                        <Typography marginLeft={1} marginTop={0.5}>{t('Requests.Approved')}</Typography>
                    </Grid>

                    <Grid container direction="row" marginBottom={2} >
                        <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: red[300] }}><CloseIcon /></Avatar>
                        <Typography marginLeft={1} marginTop={0.5}>{t('Requests.Rejected')}</Typography>
                    </Grid>

                    <Grid container direction="row" marginBottom={2}  >
                        <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: blue[800] }} >< HourglassTopIcon /></Avatar>
                        <Typography marginLeft={1} marginTop={0.5} >{t('Requests.notProcessed')!}</Typography>
                    </Grid>

                    <Grid container direction="row" marginBottom={2}  >
                        <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: purple[500] }} >< WeekendIcon /></Avatar>
                        <Typography marginLeft={1} marginTop={0.5} >{t('holiday')!}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default React.forwardRef(CustomDay);

