
import { Grid } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarStyleRangePicker } from './CalendarStyleRangePicker';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
dayjs.extend(isBetweenPlugin);

type CustomDayProps = {
    onDateChange: (startDate: string, endDate: string) => void;
    initialStartDate:string;
    initialEndDate:string;
}
const CalendarRangePicker = (props: CustomDayProps): JSX.Element => {
    const [t] = useTranslation();
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(props.initialStartDate));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(props.initialEndDate));

    const handleChange = (newValue: dayjs.Dayjs | null) => {

        let sDate=startDate;
        let eDate=endDate;
        console.log("handleChange")
            if (newValue?.isSame(endDate, 'day')) {
                console.log("first")
                sDate=newValue;
                setStartDate(newValue)
            }
            if (newValue?.isSame(startDate, 'day')) {
                console.log("second")
                sDate=newValue;
                eDate=newValue;
                setEndDate(newValue)
                setStartDate(newValue)
            }
            if (newValue?.isAfter(startDate, 'day')) {
                console.log("third")
                eDate=newValue;
                setEndDate(newValue)
            }

            if (newValue?.isBefore(startDate, 'day')) {
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

    return (
        <Grid container>
            <Grid item direction="row" >

                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={t('Calendar Locale')!}>
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
