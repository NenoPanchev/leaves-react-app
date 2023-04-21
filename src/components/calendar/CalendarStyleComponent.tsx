
import { red, green, blue, purple } from "@mui/material/colors";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { styled } from '@mui/material/styles';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import IRequestDataGet from "../../models/interfaces/request/IRequestDataGet";

dayjs.extend(isBetweenPlugin);
interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    dayIsBetween: Array<boolean>;
    isStart: Array<boolean>;
    isEnd: Array<boolean>;
    isRejected: Array<boolean | undefined>;
    isRed: Array<boolean>;
    requestdayisholiday: Array<boolean>;
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
})<CustomPickerDayProps>(({ theme, dayIsBetween, isStart, isEnd, isRejected, isRed, requestdayisholiday: requestDayIsHoliday, isHoliday }) => {
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


export function Day(props: PickersDayProps<Dayjs> & { requests?: Array<IRequestDataGet> } & { holidays?: Array<string> } ) {

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
            requestdayisholiday={requestDayIsHoliday}
            isHoliday={isHoliday}
        />
    );
}
export function disableWeekends(date: dayjs.Dayjs) {
    return date.day() === 0 || date.day() === 6 || date.isBefore(dayjs().subtract(1, 'day'));
}
export default CustomPickersDay;