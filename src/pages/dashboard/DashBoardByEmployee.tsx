
import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CalendarById from '../../components/calendar/CalendarById';
import { IUserDetails } from '../../models/interfaces/user/IUserDetails';
import UserBaseDetails from '../../models/users/UserBaseDetails';
import { getUserById } from '../../services/userService';
import LeavesReport from '../../models/users/leavesReport/LeavesReport';

const UserBaseDetailsMemo = React.memo(UserBaseDetails);
const LeavesReportMemo = React.memo(LeavesReport);
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

    return (
        <React.Fragment>

            <Grid container display="flex" justifyContent="center" sx={{ backgroundColor: 'white', textAlign: 'center', height: '100%', width: '100%' }}>

                {/* User Details */}
                    <Grid item mt="2%" sx={{display: !showDetails ? 'none' : undefined}} >
                        <Paper >
                            <Typography>{t('User info:')}</Typography>


                            <UserBaseDetailsMemo email={userByiId.email} />


                        </Paper>
                    </Grid>
            
                {/* Calendar */}
          
                    <Grid item mt="2%" ml="5%"  justifySelf="end">
                        <Paper sx={{ height: "fit-content", width: "fit-content" }} >
                            <CalendarById employeeId={parseInt(id!)} onShow={updateDetails} />
                        </Paper>
                    </Grid>
                    
                    <Grid item  ml="5%" sx={{display: !showDetails ? 'none' : undefined}} >
                        <LeavesReportMemo id={parseInt(id!)}/>
                    </Grid>

               
            </Grid>
        </React.Fragment>

    )
}
