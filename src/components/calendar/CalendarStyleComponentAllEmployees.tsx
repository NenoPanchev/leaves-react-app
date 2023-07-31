
import { red, green, blue, purple, yellow } from "@mui/material/colors";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import IRequestDataGet from "../../models/interfaces/request/IRequestDataGet";
import { styled } from "@mui/material/styles";

dayjs.extend(isBetweenPlugin);
interface CustomPickerDayRangeProps extends PickersDayProps<Dayjs> {
    isHoliday: Array<boolean>;
}
const CustomPickerDayRange = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'isHoliday',
})<CustomPickerDayRangeProps>(({ theme,isHoliday}) => {
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

    for (const holiday of isHoliday) {
        if (holiday) {

            //HOLIDAY
            styl.backgroundColor = purple[300];
            styl['&:hover, &:focus'].backgroundColor = purple[400];
            return styl;
        }
    }

    return {}
}) as React.ComponentType<CustomPickerDayRangeProps>;




export function DayWithRangeAll(props: PickersDayProps<Dayjs> &
{ holidays?: Array<string> } 
) {

    const { day, holidays, ...other } = props;

    if (holidays == null) {
        return <PickersDay day={day} {...other} />;
    }

    const isHoliday: Array<boolean> = [];


    holidays.forEach(holiday => {
        isHoliday.push(day.isSame(holiday, 'day'));
    })
    return (
        <CustomPickerDayRange
            {...other}
            day={day}
            disableMargin
            isHoliday={isHoliday}
        />
    );
}
export function disableWeekends(date: dayjs.Dayjs) {
    return date.day() === 0 || date.day() === 6 || date.isBefore(dayjs().subtract(1, 'day'));
}
export default CustomPickerDayRange;