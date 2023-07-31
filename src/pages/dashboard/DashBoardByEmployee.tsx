
import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CalendarById from '../../components/calendar/CalendarById';
import { IUserDetails } from '../../models/interfaces/user/IUserDetails';
import UserBaseDetails from '../../models/users/UserBaseDetails';
import LeavesReportDialog from '../../models/users/leavesReport/LeavesReportDialog';
import { getUserById } from '../../services/userService';

const LeavesReportDialogMemo = React.memo(LeavesReportDialog);
export default function DashBoardByEmployee() {
    const [userByiId, setUser] = React.useState<IUserDetails>({} as IUserDetails)
    const { t } = useTranslation();
    let { id } = useParams();

    const [showDetails, setShowDetails] = useState(true)
    React.useEffect(() => {
        retriveEmpl();
    }, []);

    const retriveEmpl = async () => {
       await getUserById(parseInt(id!))
            .then((response: any) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const UserBaseDetailsMemo = React.memo(UserBaseDetails);
    const updateDetails = useCallback(

        (): void => setShowDetails(!showDetails),

        [showDetails]
    );

    return (
        <React.Fragment>

            <Grid container display="flex" justifyContent="center" sx={{ backgroundColor: 'white', textAlign: 'center', height: '100%', width: '100%' }}>

                {/* User Details */}
                <Grid item mt="2%" sx={{ display: !showDetails ? 'none' : undefined }} >
                    <Paper >
                        <Typography>{t('User info:')}</Typography>

                        <LeavesReportDialogMemo id={userByiId.id}/>

                        <UserBaseDetailsMemo email={userByiId.email} />


                    </Paper>
                </Grid>

                {/* Calendar */}

                <Grid item mt="2%" ml="5%" justifySelf="end">
                    <Paper sx={{ height: "fit-content", width: "fit-content" }} >
                        <CalendarById employeeId={parseInt(id!)} onShow={updateDetails} />
                        
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>

    )
}
