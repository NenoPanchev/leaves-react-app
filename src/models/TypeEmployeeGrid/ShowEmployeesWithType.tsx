import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { Divider, Grid, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ITypeEmploeeGet from '../interfaces/type/ITypeEmploeeGet';
import AuthContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import IEmploeeGet from '../interfaces/employeeInfo/IEmployeeGet';

type ShowEmployeesWithTypeProps = {
    typeEmployee: ITypeEmploeeGet,
}
const ShowEmployeesWithType: React.FC<ShowEmployeesWithTypeProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [t, i18n] = useTranslation();
    const currentUser = React.useContext(AuthContext);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '8rem',
        height: '3rem',
    };
    React.useEffect(() => {

    }, [currentUser.user]);
    function renderEmployeeLink(employeeInfo: IEmploeeGet) {
        let isUser = currentUser.user!.getId() === employeeInfo.id;
        if (isUser) {
            return (<Grid item marginLeft="auto" marginTop="auto" marginBottom="auto" marginRight="2%" >
                <Link to="/">
                    <Typography variant="overline" component="div">
                        {"Id:" + employeeInfo.id + " " + t('name') + employeeInfo.name}
                    </Typography>

                </ Link>
            </Grid>
            )
        } else {

            return (
                <Grid item marginLeft="auto" marginTop="auto" marginBottom="auto" marginRight="2%">
                    <Link to={{ pathname: `/requests/employee/${employeeInfo.id}` }} style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        <Typography variant="overline" component="div">
                            {"Id:" + employeeInfo.id + " " + t('name') + employeeInfo.name}
                        </Typography>
                    </ Link>
                </Grid>)

        }
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<Tooltip title={t('showEmployees')}><RecentActorsIcon /></Tooltip>} onClick={handleClickOpen}></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                fullWidth
                maxWidth='sm'

            >
                <DialogTitle id="alert-dialog-title">
                    <Grid container justifyContent="center">
                        <Typography variant="overline" alignContent="center" >
                            {t('EmployeesWithType')}:
                            <Box display="flex"
                                justifyContent="center"
                                alignItems="center">
                                {props.typeEmployee.typeName}
                            </Box>
                        </Typography>
                    </Grid>
                </DialogTitle>

                <DialogContent>
                    <Grid container alignContent="center" justifyContent="center">


                        <List>
                            {props.typeEmployee.employeeWithType.map((item) => {
                                return (
                                    <Grid >
                                        <ListItem key={item.id}>
                                            {renderEmployeeLink(item)}
                                        </ListItem>
                                        <Divider />
                                    </Grid>
                                )
                            })}
                        </List>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>{t('Close')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ShowEmployeesWithType;