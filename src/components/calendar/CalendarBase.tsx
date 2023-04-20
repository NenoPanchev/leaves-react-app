import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Avatar, Grid, Tooltip, Typography, tooltipClasses } from '@mui/material';
import { blue, green, grey, purple, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';
import RequestService from '../../services/RequestService';
import PdfFormRequest from '../pdfForm/PdfFormRequest';
import Filter from '../../models/interfaces/request/Filter';
import BasicDialogAlert from '../Alert/BasicDialogAlert';
import { useState } from 'react';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/bg';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout/pickersLayoutClasses';
import HolidayService from '../../services/HolidayService';
import { da } from 'date-fns/locale';
import WeekendIcon from '@mui/icons-material/Weekend';

dayjs.extend(isBetweenPlugin);
export interface CalendarBaseRef {
    reload: () => void;
}
type CustomDayProps = {
    onDateChange: (day: Dayjs | null) => void;
}
interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    dayIsBetween: Array<boolean>;
    isStart: Array<boolean>;
    isEnd: Array<boolean>;
    isRejected: Array<boolean | undefined>;
    isRed: Array<boolean>;
    requestDayIsHoliday: Array<boolean>;
    isHoliday: Array<boolean>;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' &&
        prop !== 'isStart' &&
        prop !== 'isEnd' &&
        prop !== 'isRejected' &&
        prop !== 'isRed' &&
        prop !== 'isBeforeToday' &&
        prop !== 'isHoliday',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isStart, isEnd, isRejected, isRed, requestDayIsHoliday, isHoliday }) => {
    let counter = 0;
    let holidayCounter = 0;
    let styl = {
        borderRadius: 0,
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        backgroundColor: "#90caf9",
        color: theme.palette.common.white,
        '&:hover, &:focus': {
            backgroundColor: '#42a5f5',
        },

    }

    for (const dayIsBetweenItem of dayIsBetween) {
        ////COLOR CHANGE


        if (isRejected[counter] == false) {
            //
            //REJECTED
            //
            styl.backgroundColor = red[200];
            styl['&:hover, &:focus'].backgroundColor = red[400];

        } else if (isRejected[counter] == true) {
            //
            //APPROVED
            //
            if (!isRed[counter]) {
                styl.backgroundColor = red[200];
                styl['&:hover, &:focus'].backgroundColor = red[400];
            }
            else {
                styl.backgroundColor = green[200];
                styl['&:hover, &:focus'].backgroundColor = green[400];
            }

        }
        else {
            //
            //NOT PROCESSED 
            //
            styl.backgroundColor = blue[200];
            styl['&:hover, &:focus'].backgroundColor = blue[400];
        }


        if (requestDayIsHoliday[counter]) {
            //HOLIDAY COLOR CHANGE
            styl.backgroundColor = purple[500];
            styl['&:hover, &:focus'].backgroundColor = purple[600];
        }
        //END OF COLOR CHANGE

        //START OF FORM CHANGE
        if (isStart[counter] && isEnd[counter]) {

            return styl
        } else if (isStart[counter]) {
            styl.borderBottomRightRadius = '0%';
            styl.borderTopRightRadius = '0%';
            return styl

        } else if (isEnd[counter]) {
            styl.borderTopLeftRadius = '0%';
            styl.borderBottomLeftRadius = '0%';
            return styl;

        } else if (dayIsBetweenItem) {

            styl.borderTopLeftRadius = '0%';
            styl.borderBottomLeftRadius = '0%';
            styl.borderBottomRightRadius = '0%';
            styl.borderTopRightRadius = '0%';
            return styl;
        }




        counter++;
    }
    for (const holiday of isHoliday) {
        if (holiday) {

            //HOLIDAY
            styl.backgroundColor = purple[500];
            styl['&:hover, &:focus'].backgroundColor = purple[600];
            return styl;
        }

        holidayCounter++;
    }

    return {}
}) as React.ComponentType<CustomPickerDayProps>;
let dayCounter = 0;

function Day(props: PickersDayProps<Dayjs> & { requests?: Array<IRequestDataGet> } & { holidays?: Array<string> }) {
    const { day, requests, holidays, ...other } = props;

    if (requests == null) {
        return <PickersDay day={day} {...other} />;
    }
    if (holidays == null) {
        return <PickersDay day={day} {...other} />;
    }
    const dayIsBetween: Array<boolean> = [];
    const isStart: Array<boolean> = [];
    const isEnd: Array<boolean> = [];
    const isRejected: Array<boolean | undefined> = [];
    const isRed: Array<boolean> = [];
    const requestDayIsHoliday: Array<boolean> = [];
    const isHoliday: Array<boolean> = [];

    holidays.forEach(holiday => {
        //with WEEKENDS 
        // isHoliday.push(day.isSame(holiday,'day')||day.day()==6||day.day()==0);

        //without WEEKENDS 
        isHoliday.push(day.isSame(holiday, 'day'));
    })
    requests.forEach(element => {

        dayIsBetween.push(day.isBetween(element.startDate, element.endDate, null, '[]'));
        isStart.push(day.isSame(element.startDate, 'day'));
        isEnd.push(day.isSame(element.endDate, 'day'));
        isRejected.push(element.approved)
        isRed.push(day.isBetween(element.approvedStartDate, element.approvedEndDate, null, '[]'))
        // isBeforeToday.push(day.isBefore(dayjs().subtract(1, 'day')))
        console.log(holidays);
        requestDayIsHoliday.push(holidays.includes(day.format("YYYY-MM-DD")))


    }
    );
    return (
        <CustomPickersDay
            {...other}
            day={day}
            disableMargin
            dayIsBetween={dayIsBetween}
            isStart={isStart}
            isEnd={isEnd}
            isRejected={isRejected}
            isRed={isRed}
            requestDayIsHoliday={requestDayIsHoliday}
            isHoliday={isHoliday}
        />
    );
}

const alertMassage = "You can not download Pdf of a request that is not approved!";
const CustomDay = (props: CustomDayProps, ref: React.ForwardedRef<CalendarBaseRef>): JSX.Element => {
    const [leaveRequests, setLeaveRequests] = React.useState<Array<IRequestDataGet>>([]);
    const [holidays, setHolidays] = React.useState<Array<string>>([]);
    const [t, i18n] = useTranslation();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);

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

    const handleChange = (newValue: dayjs.Dayjs | null) => {
        leaveRequests.forEach(element => {
            if (element.approved) {
                if (newValue?.isBetween(element.startDate, element.endDate, null, '[]')) {
                    setLeaveRequest(element);
                    setOpen(true);
                    return;
                }
                if (newValue?.isSame(element.endDate, 'day')) {
                    setLeaveRequest(element);
                    setOpen(true);
                    return;
                }
            }
            else if (element.approved == null || element.approved == false) {
                if (newValue?.isSame(element.endDate, 'day') || newValue?.isBetween(element.startDate, element.endDate, null, '[]')) {
                    setOpenAlert(true)
                    return;
                }
            }
        })
        props.onDateChange(newValue);
    };
    const handleMonthChange = () => {
        dayCounter = 0;

    };

    const retrivePage = async () => {
        await RequestService.getAllByUser()
            .then((response: any) => {
                setLeaveRequests(response.data);
                // console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const retriveHolidays = async () => {
        await HolidayService.getAll()
            .then((response: any) => {
                setHolidays(response.data);
                // console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    function disableWeekends(date: dayjs.Dayjs) {
        return date.day() === 0 || date.day() === 6 || date.isBefore(dayjs());
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
                            slots={{ day: Day }}
                            slotProps={{
                                day: {
                                    requests: leaveRequests,
                                    holidays: holidays
                                } as any,
                            }}
                          
                            onMonthChange={() => handleMonthChange()}
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
