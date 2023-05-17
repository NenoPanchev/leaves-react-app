import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { Divider, Grid, List, ListItem, ListItemText, TextField, Tooltip, Typography } from '@mui/material';
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
import { useState } from 'react';

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
    const [filteredList, setFilteredList] = useState<Array<IEmploeeGet>>(props.typeEmployee.employeeWithType);
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
            return (
                <Link to="/">
                    <Typography variant="overline" >
                        {employeeInfo.name}
                    </Typography>

                </ Link>

            )
        } else {

            return (

                <Link to={{ pathname: `/requests/employee/${employeeInfo.id}` }} style={{
                    textDecoration: 'none',
                    color: 'black'
                }}>
                    <Typography variant="overline" >
                        {employeeInfo.name}
                    </Typography>
                </ Link>
            )

        }
    }
    const handleClose = () => {
        setOpen(false);
    };
  
    const filterList = (name:string) => {
        setFilteredList(props.typeEmployee.employeeWithType.filter(s=>s.name.toLocaleUpperCase().includes(name.toLocaleUpperCase())))
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
                    <Grid container alignContent="center" justifyContent="center" width="100%" direction="column" mt="1%">
                    <Grid item>
                    <TextField id="outlined-search" label="Search field" type="search"  onChange={(e) => filterList(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <List>
                            {filteredList.map((item) => {
                                return (
                                    <Grid item width="100%" justifyContent="center" >
                                        <ListItem key={item.id}>
                                            {renderEmployeeLink(item)}
                                        </ListItem>
                                        <Divider />
                                    </Grid>
                                )
                            })}
                        </List>
                    </Grid>
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