import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, Dialog, DialogActions, DialogContent, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
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
      <ListItemButton onClick={handleClickOpen} sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
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
          <CalendarBase />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} >{t(`Close`)!}</Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}
export default CustomDay;
