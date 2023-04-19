import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, Divider, Grid, TextField, Typography } from '@mui/material';
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
  let userDetails = null;
  if (user != null) {
    userDetails = userService.useFetchOneEmail(user.getEmail());
  }

  const handleClose = () => {
    props.onClose(false);
    setOpen(false);
  };


  const { leaveRequest } = props;
  const [requestForm, setRequestForm] = useState<IRequestFormPdf>({
    requestToName: "Александър Василев",
    year: dayjs().year().toString(),
    position: ((userDetails == null) ? "" : userDetails.employeeInfo.typeName),
    address: ((userDetails == null) ? "" : userDetails.employeeInfo.address),
    ssn: ((userDetails == null) ? "" : userDetails.employeeInfo.ssn),
    saved: false
  });
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setRequestForm({ ...requestForm, saved: checked })
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
    await RequestService.getPdf(leaveRequest.id, requestForm)
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
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    margin={'normal'}
                    label="Address"
                    name="address"
                    onChange={handleChange}
                    value={requestForm.address}
                    required
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    margin={'normal'}
                    label="Position"
                    name="position"
                    onChange={handleChange}
                    value={requestForm.position}
                    required
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    margin={'normal'}
                    label="Year"
                    name="year"
                    onChange={handleChange}
                    required
                    value={requestForm.year}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    margin={'normal'}
                    label="Ssn"
                    name="ssn"
                    onChange={handleChange}
                    value={requestForm.ssn}
                    type="number"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    margin={'normal'}
                    label="Request To"
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
            </Box>
          </CardContent>
        </Box>
      </DialogContent>



      <DialogActions>
        <Grid container
          spacing={0}
          direction="row"
        >
          <Grid item direction="row" >
            <Typography >Save Information :</Typography>
            <Checkbox checked={checked} onChange={handleChangeCheckBox} inputProps={{ 'aria-label': 'controlled' }} />
          </Grid>


          <Grid marginLeft="auto" >
            <Button onClick={handleSubmit} >{t('Submit')}</Button>
            <Button onClick={handleClose} >{t('Close')}</Button>
          </Grid>
        </Grid >

      </DialogActions>


    </Dialog>
  );
}
export default PdfFormRequest;