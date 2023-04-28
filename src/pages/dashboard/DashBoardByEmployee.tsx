
import { Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CalendarById from '../../components/calendar/CalendarById';
import UserBaseDetails from '../../models/users/UserBaseDetails';
import { getUserById } from '../../services/userService';
import { IUserDetails } from '../../models/interfaces/user/IUserDetails';
import { useCallback, useState } from 'react';
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
export default function DashBoardByEmployee() {
    const [userByiId, setUser] = React.useState<IUserDetails>({} as IUserDetails)
    const { t, i18n } = useTranslation();
    let { id } = useParams();
    const [showDetails, setShowDetails] = useState(true)
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
    const updateDetails = useCallback(

        (): void => setShowDetails(!showDetails),

        [showDetails]
    );
    const UserBaseDetailsMemo = React.memo(UserBaseDetails);
    return (
        <React.Fragment>

            <Grid container direction={'row'} justifyContent="center" sx={{ backgroundColor: 'white', textAlign: 'center', height: '100%', width: '100%' }}>

                {/* User Details */}
                {showDetails &&
                    <Grid item mt="2%" >
                        <Paper >
                            <Typography>{t('My info:')}</Typography>


                            <UserBaseDetailsMemo email={userByiId.email} />


                        </Paper>
                    </Grid>
                }
                {/* Calendar */}
                <Grid item mt="2%" ml="5%" >
                    <Paper >
                        <CalendarById employeeId={parseInt(id!)} onShow={updateDetails} />
                    </Paper>
                </Grid>


            </Grid>
        </React.Fragment>

    )
}
