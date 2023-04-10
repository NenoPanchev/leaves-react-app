import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import RequestService from '../../services/RequestService';
import { blue, green, lightBlue, pink, red } from '@mui/material/colors';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Grid, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { width } from '@mui/system';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';

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
  console.log(isStart)
  let counter = 0;
  for (const dayIsBetweenItem of dayIsBetween) {
    //
    //REJECTED
    //
    if (isRejected[counter] == false) {
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
  const [open, setOpen] = React.useState(false);
  const [t, i18n] = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    retrivePage();
  }, [open]);

  const retrivePage = async () => {
    await RequestService.getAllByUser()
      .then((response: any) => {
        console.log(response.data);
        console.log(response.data.content);
        setLeaveRequests(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  // leaveRequests.forEach(element => {
  //   element.createdBy
  // });

  return (
    <React.Fragment>
        <ListItemButton onClick={handleClickOpen} sx={{paddingTop: '12px', paddingBottom: '12px'}}>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <Typography color="black"   >
            {t('Calendar')}
          </Typography>
        </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
       
        <DialogContent>
          <Grid container direction="row" sx={{ width: 'flex' }} >
            <Grid item >

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                sx={{}}
                  slots={{ day: Day }}
                  slotProps={{
                    day: {
                      requests: leaveRequests
                    } as any,
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item direction="column" marginTop="auto" marginBottom="auto">

              <Grid container direction="row" marginBottom={2}  >
                <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: green[300] }}><CheckIcon /></Avatar>
                <Typography marginLeft={1} marginTop={0.5}>Approved</Typography>
              </Grid>

              <Grid container direction="row" marginBottom={2} >
                <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: red[300] }}><CloseIcon /></Avatar>
                <Typography marginLeft={1} marginTop={0.5}>Rejected</Typography>
              </Grid>

              <Grid container direction="row" marginBottom={2}  >
                <Avatar sx={{ width: 35, height: 35 }} style={{ backgroundColor: blue[800] }} >< HourglassTopIcon /></Avatar>
                <Typography marginLeft={1} marginTop={0.5} >Not processed</Typography>
              </Grid>

            </Grid>




          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} >{t(`Close`)!}</Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}
export default CustomDay;
