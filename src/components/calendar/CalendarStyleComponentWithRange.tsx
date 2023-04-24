
import { red, green, blue, purple } from "@mui/material/colors";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { styled } from '@mui/material/styles';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import IRequestDataGet from "../../models/interfaces/request/IRequestDataGet";

dayjs.extend(isBetweenPlugin);
interface CustomPickerDayRangeProps extends PickersDayProps<Dayjs> {
    dayIsBetween: Array<boolean>;
    isStart: Array<boolean>;
    isEnd: Array<boolean>;
    isRejected: Array<boolean | undefined>;
    isRed: Array<boolean | null>;
    requestdayisholiday: Array<boolean>;
    isHoliday: Array<boolean>;
    dayIsBetweenRange: boolean;
    isFirstDayOfRange: boolean;
    isLastDayOfRange: boolean;
}
const CustomPickerDayRange = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' &&
        prop !== 'isStart' &&
        prop !== 'isEnd' &&
        prop !== 'isRejected' &&
        prop !== 'isRed' &&
        prop !== 'isBeforeToday' &&
        prop !== 'isHoliday' &&
        prop !== 'dayIsBetweenRange' &&
        prop !== 'isFirstDayOfRange' &&
        prop !== 'isLastDayOfRange',
})<CustomPickerDayRangeProps>(({ theme,
    dayIsBetween, isStart, isEnd, isRejected: isApproved, isRed: notRed,
    requestdayisholiday: requestDayIsHoliday, isHoliday,
    dayIsBetweenRange, isFirstDayOfRange, isLastDayOfRange }) => {
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


    if (dayIsBetween) {
        for (const dayIsBetweenItem of dayIsBetween) {

            ////COLOR CHANGE
            if (isApproved[counter] === false) {
                //
                //REJECTED
                //
                styl.backgroundColor = red[200];
                styl['&:hover, &:focus'].backgroundColor = red[300];

            } else if (isApproved[counter] === true) {
                //
                //APPROVED
                //

                if (notRed[counter]) {
                    styl.backgroundColor = green[200];
                    styl['&:hover, &:focus'].backgroundColor = green[300];
                }
                else if (notRed[counter] === false) {

                    styl.backgroundColor = red[200];
                    styl['&:hover, &:focus'].backgroundColor = red[300];
                }

            }
            else {
                //
                //NOT PROCESSED 
                //
                styl.backgroundColor = blue[200];
                styl['&:hover, &:focus'].backgroundColor = blue[300];
            }


            if (requestDayIsHoliday[counter]) {
                //HOLIDAY COLOR CHANGE
                styl.backgroundColor = purple[300];
                styl['&:hover, &:focus'].backgroundColor = purple[400];
            } else if (!requestDayIsHoliday[counter] && dayIsBetweenRange) {
                styl.backgroundColor = blue[100];
                styl['&:hover, &:focus'].backgroundColor = blue[200];
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

    }





    //RANGE PICKER FORM CHANGE    
    if (isFirstDayOfRange && isLastDayOfRange) {

        return styl
    } else if (isFirstDayOfRange) {

        styl.borderBottomRightRadius = '0%';
        styl.borderTopRightRadius = '0%';
        return styl
    } else if (isLastDayOfRange) {

        styl.borderTopLeftRadius = '0%';
        styl.borderBottomLeftRadius = '0%';
        return styl;
    } else if (dayIsBetweenRange) {

        styl.borderTopLeftRadius = '0%';
        styl.borderBottomLeftRadius = '0%';
        styl.borderBottomRightRadius = '0%';
        styl.borderTopRightRadius = '0%';
        return styl;
    }
    //END RANGE PICKER FORM CHANGE

    for (const holiday of isHoliday) {
        if (holiday) {

            //HOLIDAY
            styl.backgroundColor = purple[300];
            styl['&:hover, &:focus'].backgroundColor = purple[400];
            return styl;
        }

        holidayCounter++;
    }






    return {}
}) as React.ComponentType<CustomPickerDayRangeProps>;




export function DayWithRange(props: PickersDayProps<Dayjs> &
{ requests?: Array<IRequestDataGet> } &
{ holidays?: Array<string> } &
{ endDate?: Dayjs | null } &
{ startDate?: Dayjs | null }
) {

    const { day, requests, startDate, endDate, holidays, ...other } = props;

    if (requests == null) {
        return <PickersDay day={day} {...other} />;
    }
    if (holidays == null) {
        return <PickersDay day={day} {...other} />;
    }
    if (endDate == null) {
        return <PickersDay day={day} {...other} />;
    }
    if (startDate == null) {
        return <PickersDay day={day} {...other} />;
    }

    const dayIsBetween: Array<boolean> = [];
    const isStart: Array<boolean> = [];
    const isEnd: Array<boolean> = [];
    const isRejected: Array<boolean | undefined> = [];
    const isRed: Array<boolean | null> = [];
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
        if (element.approved) {
            isRed.push(day.isBetween(element.approvedStartDate, element.approvedEndDate, null, '[]'))
        }
        else {
            isRed.push(null);
        }


        // isBeforeToday.push(day.isBefore(dayjs().subtract(1, 'day')))
        requestDayIsHoliday.push(holidays.includes(day.format("YYYY-MM-DD")))
    }
    );
    console.log(isRejected)
    console.log(isRed)
    const dayIsBetweenRange = day.isBetween(startDate, endDate, null, '[]');
    const isFirstDayOfRange = day.isSame(startDate, 'day');
    const isLastDayOfRange = day.isSame(endDate, 'day');
    return (
        <CustomPickerDayRange
            dayIsBetweenRange={dayIsBetweenRange}
            isFirstDayOfRange={isFirstDayOfRange}
            isLastDayOfRange={isLastDayOfRange}
            {...other}
            day={day}
            disableMargin
            dayIsBetween={dayIsBetween}
            isStart={isStart}
            isEnd={isEnd}
            isRejected={isRejected}
            isRed={isRed}
            requestdayisholiday={requestDayIsHoliday}
            isHoliday={isHoliday} />
    );
}
export function disableWeekends(date: dayjs.Dayjs) {
    return date.day() === 0 || date.day() === 6 || date.isBefore(dayjs().subtract(1, 'day'));
}
export default CustomPickerDayRange;