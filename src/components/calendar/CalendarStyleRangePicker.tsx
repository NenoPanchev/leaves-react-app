
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from "@mui/material/styles";

dayjs.extend(isBetweenPlugin);
interface CustomPickerDayRangeProps extends PickersDayProps<Dayjs> {
    dayIsBetweenRange: boolean;
    isFirstDayOfRange: boolean;
    isLastDayOfRange: boolean;
}
const CustomPickerDayRange = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetweenRange' &&
        prop !== 'isFirstDayOfRange' &&
        prop !== 'isLastDayOfRange',
})<CustomPickerDayRangeProps>(({ theme,dayIsBetweenRange, isFirstDayOfRange, isLastDayOfRange}) => {


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

    return {}
}) as React.ComponentType<CustomPickerDayRangeProps>;




export function CalendarStyleRangePicker(props: PickersDayProps<Dayjs> &
{ endDate?: Dayjs | null } &
{ startDate?: Dayjs | null }
) {

    const { day,endDate, startDate, ...other } = props;


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
             />
    );
}
export default CalendarStyleRangePicker;