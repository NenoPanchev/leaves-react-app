import { Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarById from '../../components/calendar/CalendarById';
import UserBaseDetails from '../../models/users/UserBaseDetails';
import { getUserById, useFetchOne } from '../../services/userService';
import { IUserDetails } from '../../models/interfaces/user/userInterfaces';
import { useParams } from 'react-router-dom';
// {
//     id: 0,
//     name: "",
//     email: "",
//     department: "",
//     roles: [{
//       name: "",
//       permissions: [{
//         name: ""
//       }]}],
//     createdAt: "",
//     createdBy: "",
//     lastModifiedAt: "",
//     lastModifiedBy: "",
//     employeeInfo:{ id: 0,
//         name: "",
//         typeName:"",
//         daysLeave:0,
//         contractStartDate: "",
//         typeDaysLeave:0,
//          ssn:"",
//          address:""}
// } 
export default function DashBoardByEmployee()  {
    const [userByiId, setUser]=React.useState<IUserDetails>({} as IUserDetails)
    const { t, i18n } = useTranslation();
    let { id } = useParams();
    React.useEffect(() => {
        retriveEmpl();
    }, [setUser]);

    const retriveEmpl = async () => {
         getUserById(parseInt(id!))
            .then((response: any) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const UserBaseDetailsMemo = React.memo(UserBaseDetails);
console.log(userByiId.email)
    return (
        <React.Fragment>
            <Grid container direction={'column'} sx={{ backgroundColor: 'white', textAlign: 'center' }}>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                    <Grid container spacing={3}>
                        {/* User Details */}
                        <Grid item xs={5} md={5} lg={5}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'table',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Typography>{t('User info:')}</Typography>

                                <UserBaseDetailsMemo email={userByiId.email} />
                            </Paper>
                        </Grid>

                        {/* Calendar */}
                        <Grid item justifySelf="end">
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'table',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >

                                <Grid >
                                    <CalendarById employeeId={parseInt(id!)} />
                                </Grid>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </React.Fragment>
    )
}
