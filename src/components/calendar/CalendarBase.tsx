import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Avatar, Grid, Typography } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
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
import { useState } from 'react';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/bg';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    dayIsBetween: Array<boolean>;
    isStart: Array<boolean>;
    isEnd: Array<boolean>;
    isRejected: Array<boolean | undefined>;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' &&
        prop !== 'isStart' &&
        prop !== 'isEnd' &&
        prop !== 'isRejected',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isStart, isEnd, isRejected }) => {
    //  console.log(dayIsBetween);
    let counter = 0;
    for (const dayIsBetweenItem of dayIsBetween) {
        //
        //REJECTED
        //
        if (isRejected[counter] == false) {
            if (isStart[counter] && isEnd[counter]) {
                return {
                    borderRadius: 0,
                    borderTopRightRadius: '50%',
                    borderBottomRightRadius: '50%',
                    borderTopLeftRadius: '50%',
                    borderBottomLeftRadius: '50%',
                    backgroundColor: red[200],
                    color: theme.palette.common.white,

                }
            } else
                if (isStart[counter]) {
                    return {
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        backgroundColor: red[200],
                        color: theme.palette.common.white,
                    }
                } else if (isEnd[counter]) {
                    return {
                        borderRadius: 0,
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '50%',
                        backgroundColor: red[200],
                        color: theme.palette.common.white,

                    }
                } else if (dayIsBetweenItem) {
                    return {
                        borderRadius: 0,
                        backgroundColor: red[200],
                        color: theme.palette.common.white,
                        '&:hover, &:focus': {
                            backgroundColor: red[400],
                        },

                    }
                }
            //
            //APPROVED
            //
        } else if (isRejected[counter] == true) {
            if (isStart[counter] && isEnd[counter]) {
                return {
                    borderRadius: 0,
                    borderTopRightRadius: '50%',
                    borderBottomRightRadius: '50%',
                    borderTopLeftRadius: '50%',
                    borderBottomLeftRadius: '50%',
                    backgroundColor: green[200],
                    color: theme.palette.common.white,

                }
            } else
                if (isStart[counter]) {
                    return {
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        backgroundColor: green[200],
                        color: theme.palette.common.white,
                    }
                } else if (isEnd[counter]) {
                    return {
                        borderRadius: 0,
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '50%',
                        backgroundColor: green[200],
                        color: theme.palette.common.white,

                    }
                } else if (dayIsBetweenItem) {
                    return {
                        borderRadius: 0,
                        backgroundColor: green[200],
                        color: theme.palette.common.white,
                        '&:hover, &:focus': {
                            backgroundColor: green[400],
                        },

                    }
                }
        }
        //
        //NOT PROCESSED 
        //
        else {
            if (isStart[counter] && isEnd[counter]) {
                return {
                    borderRadius: 0,
                    borderTopRightRadius: '50%',
                    borderBottomRightRadius: '50%',
                    borderTopLeftRadius: '50%',
                    borderBottomLeftRadius: '50%',
                    backgroundColor: blue[200],
                    color: theme.palette.common.white,

                }
            } else
                if (isStart[counter]) {
                    return {
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        backgroundColor: blue[200],
                        color: theme.palette.common.white,
                    }
                } else if (isEnd[counter]) {
                    return {
                        borderRadius: 0,
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '50%',
                        backgroundColor: blue[200],
                        color: theme.palette.common.white,

                    }
                } else if (dayIsBetweenItem) {
                    return {
                        borderRadius: 0,
                        backgroundColor: blue[200],
                        color: theme.palette.common.white,
                        '&:hover, &:focus': {
                            backgroundColor: blue[400],
                        },

                    }
                }



        }




        counter++;
    }

    return {}
}) as React.ComponentType<CustomPickerDayProps>;


function Day(props: PickersDayProps<Dayjs> & { requests?: Array<IRequestDataGet> }) {
    const { day, requests, ...other } = props;

    if (requests == null) {
        return <PickersDay day={day} {...other} />;
    }
    const dayIsBetween: Array<boolean> = [];
    const isStart: Array<boolean> = [];
    const isEnd: Array<boolean> = [];
    const isRejected: Array<boolean | undefined> = [];
    requests.forEach(element => {
        dayIsBetween.push(day.isBetween(element.startDate, element.endDate, null, '[]'));
        isStart.push(day.isSame(element.startDate, 'day'));
        isEnd.push(day.isSame(element.endDate, 'day'));
        isRejected.push(element.approved)

    });

    return (
        <CustomPickersDay
            {...other}
            day={day}
            disableMargin
            dayIsBetween={dayIsBetween}
            isStart={isStart}
            isEnd={isEnd}
            isRejected={isRejected} />
    );
}

const CustomDay: React.FC = (): JSX.Element => {
    const [leaveRequests, setLeaveRequests] = React.useState<Array<IRequestDataGet>>([]);
    const [t, i18n] = useTranslation();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
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

    React.useEffect(() => {
        retrivePage();
    }, [setLeaveRequest]);


    const updateFormOpen = React.useCallback(

        (newValue: boolean): void => setOpen(newValue),

        [setOpen]
    );


    const handleChange = (newValue: dayjs.Dayjs | null) => {
        leaveRequests.forEach(element => {
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
        })
        console.log(leaveRequest);
    };

    const retrivePage = async () => {
        await RequestService.getAllByUser()
            .then((response: any) => {
                setLeaveRequests(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    return (
        <Grid item>
            <ChildMemo open={openForm} onClose={updateFormOpen} leaveRequest={leaveRequest} />
            <Grid container direction="row" sx={{ width: 'flex' }} >
                <Grid item >

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')!}>
                        <DateCalendar
                            sx={{}}
                            slots={{ day: Day }}
                            slotProps={{
                                day: {
                                    requests: leaveRequests
                                } as any,
                            }}
                            value={value}
                            onChange={(newValue) => handleChange(newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item direction="column" marginTop="auto" marginBottom="auto">

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

                </Grid>
            </Grid>
        </Grid>
    );
}
export default CustomDay;
