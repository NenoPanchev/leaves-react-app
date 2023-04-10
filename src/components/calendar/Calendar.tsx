import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Grid, ListItemButton, ListItemIcon, Typography } from '@mui/material';
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
import CalendarBase from './CalendarBase';



const CustomDay: React.FC = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [t, i18n] = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <CalendarBase/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} >{t(`Close`)!}</Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}
export default CustomDay;
