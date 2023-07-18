import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WeekendIcon from '@mui/icons-material/Weekend';
import HomeIcon from '@mui/icons-material/Home';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, purple, red, yellow } from '@mui/material/colors';
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
import { disableWeekends } from './CalendarStyleComponent';
import { DayWithRange } from './CalendarStyleComponentWithRange';
dayjs.extend(isBetweenPlugin);
export interface CalendarBaseRef {
    reload: () => void;

}
type CustomDayProps = {
    onDateChange: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
    onShow: () => void;
    onShowAddRequest: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

const alertMassage = "You can not download Pdf of a request that is not approved!";
const CustomDay = (props: CustomDayProps, ref: React.ForwardedRef<CalendarBaseRef>): JSX.Element => {
    const [leaveRequests, setLeaveRequests] = React.useState<Array<IRequestDataGet>>([]);
    const [holidays, setHolidays] = React.useState<Array<string>>([]);
    const [t, i18n] = useTranslation();
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());

    const [calendarWidth, setCalendarWidth] = React.useState("auto");
    const [calendarHeight, setCalendarHeight] = React.useState("auto");
    const [calendarDaysAndWeekLabels, setCalendarDaysAndWeekLabels] = React.useState("36px");
    const [calendarWeekLabelHeight, setCalendarWeekLabelHeight] = React.useState("40px");

    const ChildMemo = React.memo(PdfFormRequest);
    const AlertMemo = React.memo(BasicDialogAlert);

    const [leaveRequest, setLeaveRequest] = React.useState<IRequestDataGet>({

        id: -1,
        requestType: '',
        startDate: "",
        endDate: "",
        approvedStartDate: "",
        approvedEndDate: "",
        approved: false,
        createdBy: "",
        daysRequested: 0,
        deleted: false
    });
    const [openForm, setOpen] = useState<boolean>(false);


    React.useImperativeHandle(ref, () => {
        return {
            reload: retrivePage
        }
    }, [])

    React.useEffect(() => {
        retrivePage();
        retriveHolidays();
    }, []);

    React.useEffect(() => {
        props.onDateChange(startDate, endDate);
    }, [startDate, endDate]);


    const retrivePage = async () => {
        const controller = new AbortController();
        await RequestService.getAllByUser(controller)
            .then((response: any) => {
                setLeaveRequests(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        return () => controller.abort();
    }
    const retriveHolidays = async () => {
        const controller = new AbortController();
        await HolidayService.getAll(controller)
            .then((response: any) => {
                setHolidays(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        return () => controller.abort();
    }


    const updateFormOpen = React.useCallback(

        (newValue: boolean): void => setOpen(newValue),

        [setOpen]
    );
    const updateAlertOpen = React.useCallback(

        (newValue: boolean): void => setOpenAlert(newValue),

        [setOpenAlert]
    );

    function openRequest(newValue: dayjs.Dayjs | null) {
        let isCurrentElement = false;
        for (const element of leaveRequests) {
          

            if (element.approved) {
                if (newValue?.isBetween(element.startDate, element.endDate, null, '[]') || newValue?.isSame(element.endDate, 'day')) {
                    setLeaveRequest(element);
                    setOpen(true);
                    return false;
                }
            } else if (element.approved === null || element.approved === false) {
                if (newValue?.isSame(element.endDate, 'day') || newValue?.isBetween(element.startDate, element.endDate, null, '[]')) {
                    setOpen(false);
                    setOpenAlert(true);

                    return false;
                }
            }
        if ((dayjs(element.startDate).isBetween(startDate, newValue, null, '[]') || dayjs(element.endDate).isBetween(startDate, newValue, null, '[]'))) {
            isCurrentElement=true;
        }
        }

        if(isCurrentElement)
        {
            setStartDate(newValue);
            setEndDate(newValue);
        }

        return true;
    }


    const handleChange = (newValue: dayjs.Dayjs | null) => {
        if (openRequest(newValue)) {
            if (newValue?.isSame(endDate)) {
                setStartDate(newValue)
            }
            if (newValue?.isSame(startDate)) {
                setEndDate(newValue)
                setStartDate(newValue)
            }
            if (newValue?.isAfter(startDate)) {
                setEndDate(newValue)
            }

            if (newValue?.isBefore(startDate)) {
                setStartDate(newValue)
                setEndDate(newValue)
            }
        }
    };


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
        let initialheight = 174;
        if (calendarHeight === "auto") {
            return initialheight + parseInt(calendarDaysAndWeekLabels) + parseInt(calendarDaysAndWeekLabels);
        }
        else {
            return initialheight + parseInt(calendarDaysAndWeekLabels) + parseInt(calendarDaysAndWeekLabels) + 70;
        }

    }



    function handleShowClick() {
        props.onShowAddRequest(startDate, endDate)
    }
    return (

        <Grid container >
            <AlertMemo message={alertMassage} open={openAlert} onClose={updateAlertOpen}></AlertMemo>
            <ChildMemo open={openForm} onClose={updateFormOpen} leaveRequest={leaveRequest} />

            <Grid item  minWidth="36vh">

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


            <Grid item>


                <Grid item marginLeft="60%" >
                    <IconButton onClick={handleShowClick} >
                        <Tooltip title={t('AddRequests.AddRequest')}><ControlPointIcon style={{ color: grey[700], fontSize: "medium" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={handleZoomClick} >
                        <Tooltip title={t('Zoom')}><ZoomOutMapIcon style={{ color: grey[700], fontSize: "medium" }} /></Tooltip>
                    </IconButton>
                </Grid>

                <Grid item marginTop="2vh" marginBottom="auto" marginRight={1}>


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
                    <Grid container direction="row" marginBottom={2}  >
                        <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: yellow[600] }} >< HomeIcon /></Avatar>
                        <Typography marginLeft={1} marginTop={0.5} >{t('Home office')!}</Typography>
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    );
}
export default React.forwardRef(CustomDay);
