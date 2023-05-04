import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../contexts/AuthContext';
import UserBaseDetails from '../../models/users/UserBaseDetails';
import LeavesReport from '../../models/users/leavesReport/LeavesReport';
import DashBoardRequestsComponent from './DashBoardRequestsComponent';

const UserBaseDetailsMemo = React.memo(UserBaseDetails);
const LeavesReportMemo = React.memo(LeavesReport);

export default function DashBoard() {
    const { user } = React.useContext(AuthContext);
    const email = user?.getEmail();

    const { t, i18n } = useTranslation();
    
    const [showDetails, setShowDetails] = useState(true)


    const updateDetails = useCallback(
        (): void =>  setShowDetails(!showDetails),
        [showDetails]
    );
 
    return (
        <React.Fragment>
            {user !== null &&

                <Grid container direction={'row'} justifyContent="center" sx={{ backgroundColor: 'white', textAlign: 'center', height: '100%', width: '100%' }}>

                    {/* User Details */}

                    {/* {showDetails && */}
                        <Grid item mt="2%" sx={{display: !showDetails ? 'none' : undefined}}>
                            <Paper>
                                <Typography>{t('My info:')}</Typography>
                                <UserBaseDetailsMemo email={email!} />
                            </Paper>
                        </Grid>
                    {/* } */}

                    {/* Calendar */}
                    <Grid item mt="2%" ml="5%" >
                        <DashBoardRequestsComponent onShow={updateDetails} />
                    </Grid>

                     {/* LeavesReport */}
                    {/* {showDetails && */}
                    <Grid item mt="2%" sx={{display: !showDetails ? 'none' : undefined}} >
                     <Paper>
                        <LeavesReportMemo id={user.getId()}/>
                        </Paper>
                        </Grid>
                    {/* } */}
                </Grid>

            }

        </React.Fragment>
    )
}
