import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import RequestService from '../../services/RequestService';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import Tooltip from '@mui/material/Tooltip';
import CustomPickerDayRange, { disableWeekends } from './CalendarStyleComponentAllEmployees';
import HolidayService from '../../services/HolidayService';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

dayjs.extend(utc)
dayjs.extend(timezone)

function fetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: Map<number, Array<IRequestDataGet>> }>((resolve, reject) => {
        const timeout = setTimeout(async () => {
            const daysInMonth = date.daysInMonth();
            let leaveRequests: Array<IRequestDataGet> = [];
            await RequestService.getAllApprovedByMonth(date)
                .then((response: any) => {
                    leaveRequests = response.data;
                })
                .catch((e: Error) => {
                    console.log(e);
                });

            const daysToHighlight: Map<number, Array<IRequestDataGet>> = new Map;
            for (let i = 1; i <= daysInMonth; i++) {
                daysToHighlight.set(i, new Array<IRequestDataGet>());

                leaveRequests.forEach(request => {
                    const month: number = date.month() + 1;
                    const day: Dayjs = dayjs(date.year().toString() + "-" + month + "-" + i.toString());
                    if (request.approved) {
                        if (day.isBetween(request.approvedStartDate, request.approvedEndDate, null, '[]')) {
                            if (!daysToHighlight.get(i)?.includes(request)) {
                                daysToHighlight.get(i)?.push(request)
                            }
                        }
                    }
                });

            }
            resolve({ daysToHighlight });
        }, 500);

        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });

}

const initialValue = dayjs();


function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: Map<number, Array<IRequestDataGet>> } & { holidays?: Array<string> }) {
    const { highlightedDays = new Map(), day, outsideCurrentMonth, holidays, ...other } = props;
    if (holidays == null) {
        return <PickersDay outsideCurrentMonth={outsideCurrentMonth} day={day} {...other} />;
    }

    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.get(props.day.date())?.length > 0;
    let containsHome = false;
    let containsLeave = false;

    highlightedDays.get(props.day.date())?.forEach((element: IRequestDataGet) => {

        if (element.requestType === "LEAVE") {
            containsLeave = true;
        }

        if (element.requestType === "HOME_OFFICE") {
            containsHome = true;
        }
    })
    const highlightedDataForDate = highlightedDays.get(props.day.date());
    const renderTooltipContent = () => {
        if (highlightedDataForDate) {
            return (
                <div>
                    {highlightedDataForDate.map((element: IRequestDataGet) => (
                        <div key={element.id}>
                            {/* Customize the content to display relevant information */}
                            {element.createdBy} - {element.requestType === "HOME_OFFICE" ? t('Home office') : t('Leave')} {element.approvedStartDate === element.approvedEndDate ? t('on ') + element.approvedStartDate : t('from ') + element.approvedStartDate + t(' to ') + element.approvedEndDate}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const isHoliday: Array<boolean> = [];
    holidays.forEach(holiday => {
        isHoliday.push(day.isSame(holiday, 'day'));
    })

    if (isSelected) {
        return (
            <Tooltip title={renderTooltipContent()} >
                <Badge
                    key={props.day.toString()}
                    overlap="circular"
                    badgeContent={setBadge(isSelected, containsHome, containsLeave)}
                    sx={{
                        '& .MuiBadge-badge': {
                          width: '30px',
                          height: '30px',
                          fontSize: '20px',
                          fontWeight: 'bold',
                        },
                      }}
                >
                    <CustomPickerDayRange
                        {...other}
                        outsideCurrentMonth={outsideCurrentMonth}
                        day={day}
                        disableMargin
                        isHoliday={isHoliday}
                    />
                </Badge>
            </Tooltip>
        );
    }
    else {
        return (
            <CustomPickerDayRange
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                disableMargin
                isHoliday={isHoliday}
            />
        )
    }


}
function setBadge(isSelected: boolean, containsHome: boolean, containsLeave: boolean) {
    if (isSelected) {
        if (containsHome && containsLeave) {
            return '🏝️🏡'
        } else if (containsHome) {
            return '🏡'
        } else {
            return '🏝️'
        }

    } else {
        return undefined
    }
}
const DateCalendarServerRequest = (): JSX.Element => {
    const requestAbortController = React.useRef<AbortController | null>(null);
    const [highlightedDays, setHighlightedDays] = React.useState<Map<number, Array<IRequestDataGet>>>(new Map());
    const [holidays, setHolidays] = React.useState<Array<string>>([]);
    const [t] = useTranslation();

    const fetchHighlightedDays = (date: Dayjs) => {
        const controller = new AbortController();
        fetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight }) => {
                setHighlightedDays(daysToHighlight);
            })
            .catch((error) => {
                // ignore the error if it's caused by `controller.abort`
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });

        requestAbortController.current = controller;
    };

    React.useEffect(() => {
        fetchHighlightedDays(initialValue);
        retriveHolidays();
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date: Dayjs) => {
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }

        setHighlightedDays(new Map());
        // Get the first day of the selected month
        const firstDayOfMonth = date.startOf('month').tz('Europe/Sofia').add(5, 'hours');

        // Fetch the highlighted days for the selected month
        fetchHighlightedDays(firstDayOfMonth);
    };
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
    return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!}>
                <DateCalendar
                    defaultValue={initialValue}
                    shouldDisableDate={disableWeekends}
                    onMonthChange={handleMonthChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                            holidays
                        } as any,
                    }}
                    sx={{
                        width: '900px',


                        '& .MuiPickersDay-root': {
                            width: '100px',
                            height: '100px',
                            fontSize: '25px',
                            fontWeight: 'bold',
                        },
                        '& .MuiDayCalendar-weekDayLabel': {
                            width: '100px',
                            height: '100px',
                            fontSize: '25px',
                            fontWeight: 'bold',
                        },
                        '& .MuiDayCalendar-slideTransition': {
                            minHeight: '650px',
                            height: "auto"
                        },
                        '& .MuiPickersCalendarHeader-label': {
                            fontSize: '25px',
                            minWidth: '010px',
                            lineHeight: '40px',
                            // Add any other custom styles for the month dropdown here
                          },
                        '&':
                        {
                            maxHeight: "100% !important",
                        },
                    }}
                />
            </LocalizationProvider>
    );
}
export default DateCalendarServerRequest;