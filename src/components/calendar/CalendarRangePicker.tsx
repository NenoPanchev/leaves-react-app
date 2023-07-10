import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WeekendIcon from '@mui/icons-material/Weekend';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, purple, red } from '@mui/material/colors';
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
import { CalendarStyleRangePicker } from './CalendarStyleRangePicker';
dayjs.extend(isBetweenPlugin);

type CustomDayProps = {
    onDateChange: (startDate: string, endDate: string) => void;
    initialStartDate:string;
    initialEndDate:string;
}
const CalendarRangePicker = (props: CustomDayProps): JSX.Element => {
    const [leaveRequests, setLeaveRequests] = React.useState<Array<IRequestDataGet>>([]);
    const [t, i18n] = useTranslation();
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(props.initialStartDate));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(props.initialEndDate));
    // React.useImperativeHandle(ref, () => {
    //     return {
    //         reload: retrivePage
    //     }
    // }, [])
    const handleChange = (newValue: dayjs.Dayjs | null) => {

        let sDate=startDate;
        let eDate=endDate;
        console.log("handleChange")
            if (newValue?.isSame(endDate)) {
                console.log("first")
                sDate=newValue;
                setStartDate(newValue)
            }
            if (newValue?.isSame(startDate)) {
                console.log("second")
                sDate=newValue;
                eDate=newValue;
                setEndDate(newValue)
                setStartDate(newValue)
            }
            if (newValue?.isAfter(startDate)) {
                console.log("third")
                eDate=newValue;
                setEndDate(newValue)
            }

            if (newValue?.isBefore(startDate)) {
                console.log("Fourth")
                sDate=newValue;
                eDate=newValue;
                setStartDate(newValue)
                setEndDate(newValue)
            }
            console.log(startDate!)
            console.log(endDate!)
            props.onDateChange(sDate!.format('YYYY-MM-DD'), eDate!.format('YYYY-MM-DD'));
    };

    // React.useEffect(() => {
    //     console.log("asdasdasd")
    //     props.onDateChange(startDate!.format('YYYY-MM-DD'), endDate!.format('YYYY-MM-DD'));
    // }, [handleChange]);
    return (
        <Grid container>
            <Grid item direction="row" >

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!}>
                    <DateCalendar
                        sx={{
                            width: "100%",
                            height: "100%"
                        }}
                        slots={{ day: CalendarStyleRangePicker }}
                        slotProps={{
                            day: {
                                startDate: startDate,
                                endDate: endDate
                            } as any,
                        }}
                        onChange={(newValue) => handleChange(newValue)}
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
}
export default React.forwardRef(CalendarRangePicker);
