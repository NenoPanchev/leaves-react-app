import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, Divider, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../../models/interfaces/request/IRequestDataGet';
type AddRequestAlertProps = {
    open: boolean,
    onClose: (newValue: boolean) => void;
    leaveRequest : IRequestDataGet
}
const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    },
    {
      value: 'los-angeles',
      label: 'Los Angeles'
    }
  ];
const PdfFormRequest: React.FC<AddRequestAlertProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(props.open);
    const[t,i18n]=useTranslation();
    const handleClose = () => {
      props.onClose(false);
        setOpen(false);
    };
    const{leaveRequest}=props;


    const [values, setValues] = React.useState({
        firstName: 'Anika',
        lastName: 'Visser',
        email: 'demo@devias.io',
        phone: '',
        state: 'los-angeles',
        country: 'USA'
      });
    
    //   const handleChange = React.useCallback(
    //     (event) => {
    //       setValues((prevState) => ({
    //         ...prevState,
    //         [event.target.name]: event.target.value
    //       }));
    //     },
    //     []
    //   );
      const handleChange = () => {
        setOpen(false);
    };
      const handleSubmit = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
              }}
            >
                <DialogContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
              }}>

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
          subheader="The information can be edited"
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
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
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
        <Divider />
                    </Box>
                </DialogContent>
                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid>
                    <DialogActions>
                            <Button onClick={handleSubmit} >{t('Close')}</Button>
                            <Button onClick={handleClose} >{t('Close')}</Button>
                        </DialogActions>
                    </Grid >
                </Grid >

            </Dialog>
        </React.Fragment>
    );
}
export default PdfFormRequest;