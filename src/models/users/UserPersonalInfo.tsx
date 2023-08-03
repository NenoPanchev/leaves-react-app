import InfoIcon from '@mui/icons-material/Info';
import { Backdrop, Button, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import grey from '@mui/material/colors/grey';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../contexts/AuthContext';
import { IUserDetails } from '../../models/interfaces/user/IUserDetails';
import * as userService from '../../services/userService';
import { updatePersonalInfo } from '../../services/userService';
import IEmploeeGet from '../interfaces/employeeInfo/IEmployeeGet';

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
const UserPersonalInfo: React.FC = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [t, i18n] = useTranslation();
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = React.useState<IUserDetails>({
    id: -1,
    name: "",
    email: "",
    department: "",
    roles: [{
      name: "",
      permissions: [{ name: "" }]
    }],
    createdAt: "",
    createdBy: "",
    lastModifiedAt: "",
    lastModifiedBy: "",
    employeeInfo: {} as IEmploeeGet,
  });


  React.useEffect(() => {
    const controller = new AbortController();
    if (user != null) {

      userService.getUserByEmail(user?.getEmail(), controller)
        .then((r) => {
          setUserDetails(r.data);
          console.log(r.data)
          console.log(userDetails)
        })
        .catch((e) => {
          console.log(e);
        });

    }
    return () => controller.abort();
  }, []);



  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(userDetails);
    setChecked(event.target.checked);
  };



  const handleSubmit = async () => {
    setOpen(false);
    await updatePersonalInfo(userDetails)
      .then((response: any) => {

      })
      .catch((e: Error) => {
        console.log(e);
      });

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<InfoIcon style={{ color: grey[700] }} />} onClick={handleClickOpen}>
        <Typography variant="overline" color={grey[700]} >{t('personalInfo')}</Typography>
      </Button>
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
            <CardHeader
              title={t('personalInfo') + ":"} sx={{ marginRight: "auto", marginLeft: "auto" }} />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid
                  container
                  spacing={3}
                  marginLeft="5%"
                  marginRight="5%"
                >
                  <Grid
                    item
                    xs={10}
                    md={5}
                  >
                    <TextField
                      fullWidth
                      margin={'normal'}
                      label={t('Address')}
                      name="address"
                      onChange={(event) => setUserDetails({ ...userDetails, [userDetails.employeeInfo.address]: userDetails.employeeInfo.address = event.target.value })}
                      value={userDetails?.employeeInfo.address}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    md={5}
                  >
                    <TextField
                      fullWidth
                      margin={'normal'}
                      label={t('SSN')}
                      name="userDetails.employeeInfo.ssn"
                      onChange={(event) => setUserDetails({ ...userDetails, [userDetails.employeeInfo.ssn]: userDetails.employeeInfo.ssn = event.target.value })}
                      value={userDetails?.employeeInfo.ssn}
                      type="number" />
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
                <Typography marginTop="3%" >Save Information :</Typography>
                <Checkbox checked={checked} onChange={handleChangeCheckBox} inputProps={{ 'aria-label': 'controlled' }} />
              </Grid>
            </Grid>


            <Grid marginLeft="auto">
              <Button onClick={handleSubmit} disabled={!checked}>{t('Submit')}</Button>
              <Button onClick={handleClose}>{t('Close')}</Button>
            </Grid>
          </Grid>

        </DialogActions>


      </Dialog></>
  );
}
export default UserPersonalInfo;