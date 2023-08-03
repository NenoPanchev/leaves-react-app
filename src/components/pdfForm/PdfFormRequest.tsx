import { Backdrop, Button, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, Divider, Grid, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';
import IRequestFormPdf from '../../models/interfaces/request/IRequestFormPdf';
import { useCallback, useContext, useEffect, useState } from 'react';
import RequestService from '../../services/RequestService';
import fileDownload from 'js-file-download'
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import AuthContext from '../../contexts/AuthContext';
import * as userService from '../../services/userService';
import { IUserDetails } from '../../models/interfaces/user/IUserDetails';
type AddRequestAlertProps = {
  open: boolean,
  onClose: (newValue: boolean) => void;
  leaveRequest: IRequestDataGet

}
const states = [
  {
    value: 'Александър Василев',
    label: 'Александър Василев'
  },
  {
    value: 'Димитър Колев',
    label: 'Димитър Колев'
  }
];
const PdfFormRequest: React.FC<AddRequestAlertProps> = (props): JSX.Element => {
  const [open, setOpen] = React.useState(props.open);
  const [t, i18n] = useTranslation();
  const { user } = useContext(AuthContext);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  // let userDetails:IUserDetails | any = null;
  const [userDetails, setUserDetails] = React.useState<IUserDetails | any>(null);


  React.useEffect(() => {
    const controller = new AbortController();
    if (user != null) {
      if (open === true) {
        userService.getUserByEmail(user?.getEmail(), controller)
          .then((r) => {
            setUserDetails(r.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }


    return () => controller.abort();
  }, []);

  const handleClose = () => {
    props.onClose(false);
    setOpen(false);
  };


  const { leaveRequest } = props;
  const [requestForm, setRequestForm] = useState<IRequestFormPdf>({
    requestToName: "Александър Василев",
    year: dayjs().year().toString(),
    usePersonalInfo: false
  });



  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setRequestForm({ ...requestForm, usePersonalInfo: checked })
  }, [checked]);

  const handleChange = useCallback(
    (event: { target: { name: string; value: string; }; }) => {
      setRequestForm((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    [setRequestForm]
  );

  const handleSubmit = async () => {
    setOpen(false);
    handleClose();
    setOpenBackdrop(true);
    await RequestService.getPdf(leaveRequest.id, requestForm)
      .then((response: any) => {
        fileDownload(response.data, "отпуск.pdf")
        setOpenBackdrop(false);
      })
      .catch((e: Error) => {
        console.log(e);
      });

  };

  return (
    <><Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >

        <DialogContent>

          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}>
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }} justifyContent="center">
                <Grid container direction="row">
                  <Grid item marginLeft="-10%">
                    <Grid
                      container
                      direction="column"
                      spacing={3}
                    >

                      <Grid
                        item
                      >
                        <CardHeader
                          title={t('RequestInfo')} sx={{ marginLeft: "5%" }} />
                        <Card >
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className='tableHeader' variant='head'>{t('Requests.StartDate') + ':'}</TableCell>
                                <TableCell>{leaveRequest.startDate}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className='tableHeader' variant='head'>{t('Requests.EndDate') + ':'}</TableCell>
                                <TableCell>{leaveRequest.endDate}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className='tableHeader' variant='head'>{t('Requests.approvedStartDate') + ':'}</TableCell>
                                <TableCell>{leaveRequest.approvedStartDate}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className='tableHeader' variant='head'>{t('Requests.approvedEndDate') + ':'}</TableCell>
                                <TableCell>{leaveRequest.approvedEndDate}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className='tableHeader' variant='head'>{t('Requests.daysRequested') + ':'}</TableCell>
                                <TableCell>{leaveRequest.daysRequested}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item mr="-30%" ml="20%">
                    <Grid
                      container
                      direction="column"
                      spacing={1}
                    >

                      <Grid
                        item
                      >
                        <CardHeader
                          title={t('DocumentFields')} sx={{ marginLeft: "5%" }} />
                        <TextField
                          fullWidth
                          margin={'normal'}
                          label={t('Year')}
                          name="year"
                          onChange={handleChange}
                          required
                          value={requestForm.year} />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          fullWidth
                          margin={'normal'}
                          label={t('Request to')}
                          name="requestToName"
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                        >
                          {states.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>

          </Box>
        </DialogContent>



        <DialogActions>
          <Grid container
            spacing={0}
            direction="row"
          >
            <Grid item>
              <Grid container direction="row">
                <Typography marginTop="5%">{t('Use Presonal info:')}</Typography>
                <Checkbox checked={checked} onChange={handleChangeCheckBox} inputProps={{ 'aria-label': 'controlled' }} />
              </Grid>
            </Grid>
            <Grid marginLeft="auto">
              <Button onClick={handleSubmit}>{t('DownloadPdf')}</Button>
              <Button onClick={handleClose}>{t('Close')}</Button>
            </Grid>
          </Grid>

        </DialogActions>


      </Dialog></>
  );
}
export default PdfFormRequest;