import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, Divider, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';
import IRequestFormPdf from '../../models/interfaces/request/IRequestFormPdf';
import { useCallback, useState } from 'react';
import RequestService from '../../services/RequestService';
import fileDownload from 'js-file-download'
import dayjs from 'dayjs';
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
  const handleClose = () => {
    props.onClose(false);
    setOpen(false);
  };
  const { leaveRequest } = props;
  const [requestForm, setRequestForm] = useState<IRequestFormPdf>({
    requestToName: "Александър Василев",
    year: dayjs().year().toString(),
    position: "",
    location: "",
    egn: ""
  });
  const handleChange = useCallback(
    (event: { target: { name: string; value: string; }; }) => {
      setRequestForm((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  const handleSubmit =async () => {
    await RequestService.getPdf(leaveRequest.id,requestForm)
    
    .then((response: any) => {
      fileDownload(response.data, "отпуск.pdf")
    })
    .catch((e: Error) => {
      console.log(e);
    });
    setOpen(false);
  };


  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
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
          <CardHeader
            title="Profile"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    name="location"
                    onChange={handleChange}
                    required
                    // value={values.firstName}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    onChange={handleChange}
                    required
                    // value={values.lastName}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Year"
                    name="year"
                    onChange={handleChange}
                    required
                    value={requestForm.year}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Egn"
                    name="egn"
                    onChange={handleChange}
                    type="number"
                    // value={values.phone}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Request To"
                    name="requestToName"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    // value={values.state}
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
            </Box>
          </CardContent>
        </Box>
      </DialogContent>

      <Grid container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center">

        <DialogActions>
          <Button onClick={handleSubmit} >{t('Submit')}</Button>
          <Button onClick={handleClose} >{t('Close')}</Button>
        </DialogActions>

      </Grid >

    </Dialog>
  );
}
export default PdfFormRequest;