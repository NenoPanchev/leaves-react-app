import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WeekendIcon from '@mui/icons-material/Weekend';

import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, purple, red } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/bg';
import 'dayjs/locale/en-gb';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';
import HolidayService from '../../services/HolidayService';
import RequestService from '../../services/RequestService';
import { Day } from './CalendarStyleComponent';

dayjs.extend(isBetweenPlugin);
type CalendarByIdProps = {
    employeeId: number;
    onShow: () => void;
}

const CalendarById = (props: CalendarByIdProps): JSX.Element => {
    const [leaveRequests, setLeaveRequests] = React.useState<Array<IRequestDataGet>>([]);
    const [holidays, setHolidays] = React.useState<Array<string>>([]);
    const [t, i18n] = useTranslation();

    const [calendarWidth, setCalendarWidth] = React.useState("auto");
    const [calendarHeight, setCalendarHeight] = React.useState("auto");
    const [calendarDaysAndWeekLabels, setCalendarDaysAndWeekLabels] = React.useState("36px");
    const [calendarWeekLabelHeight, setCalendarWeekLabelHeight] = React.useState("40px");

    const [leaveRequest, setLeaveRequest] = React.useState<IRequestDataGet>({

        id: -1,
        startDate: "",
        endDate: "",
        approvedStartDate: "",
        approvedEndDate: "",
        approved: false,
        createdBy: "",
        daysRequested: 0,
        deleted: false
    });

    React.useEffect(() => {
        retriveRequestsByEmplId();
        retriveHolidays();
    }, [setLeaveRequest]);

    const retriveRequestsByEmplId = async () => {
        await RequestService.getAllByUserId(props.employeeId)
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
    function disableWeekends(date: dayjs.Dayjs) {
        return date.day() === 0 || date.day() === 6 || date.isBefore(dayjs().subtract(1, 'day'));
    }

    function handleZoomClick() {
        props.onShow()
        if (calendarHeight === "auto" && calendarWidth === "auto") {
            setCalendarHeight("65vh");
            setCalendarWidth("120vh");
            setCalendarDaysAndWeekLabels("56");
            setCalendarWeekLabelHeight("60");
        }
        else {

            setCalendarHeight("auto");
            setCalendarWidth("auto");
            setCalendarDaysAndWeekLabels("36");
            setCalendarWeekLabelHeight("40");
        }
    }
    function calculateCalendarHeight() {
        let initialheight = 158;
        if (calendarHeight === "auto") {
            return initialheight + parseInt(calendarDaysAndWeekLabels) + parseInt(calendarDaysAndWeekLabels);
        }
        else {
            return initialheight + parseInt(calendarDaysAndWeekLabels) + parseInt(calendarDaysAndWeekLabels) + 70;
        }

    }
    return (
        <Grid container direction="row" sx={{ width: 'flex' }} >
            <Grid item >

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!}>
                    <DateCalendar
                        sx={{
                            width: "100%",
                            height: "100%",

                            '& .MuiPickersDay-root': {
                                width: calendarDaysAndWeekLabels + "px",
                                height: calendarDaysAndWeekLabels + "px"
                            },
                            '& .MuiDayCalendar-weekDayLabel': {
                                width: calendarDaysAndWeekLabels + "px",
                                height: calendarWeekLabelHeight + "px"
                            },
                            '& .MuiDayCalendar-slideTransition': {
                                minHeight: calculateCalendarHeight() + "px",
                                height: "auto"
                            },
                            '&':
                            {
                                maxHeight: "100% !important",
                            },
                        }}
                        slots={{ day: Day }}
                        slotProps={{
                            day: {
                                requests: leaveRequests,
                                holidays: holidays
                            } as any,
                        }}
                        shouldDisableDate={disableWeekends}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item>
            <Grid container ml="550%" mt="20%" >
                <IconButton onClick={handleZoomClick} >
                    <Tooltip title={t('Zoom')}><ZoomOutMapIcon style={{ color: grey[700], fontSize: "medium" }} /></Tooltip>
                </IconButton>
            </Grid>
            </Grid>
            <Grid item marginTop="auto" marginBottom="auto" marginRight={1}>

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

    );
}
export default CalendarById;
