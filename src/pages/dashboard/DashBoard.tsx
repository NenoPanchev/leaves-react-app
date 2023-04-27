import { Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../contexts/AuthContext';
import UserBaseDetails from '../../models/users/UserBaseDetails';
import DashBoardRequestsComponent from './DashBoardRequestsComponent';

export default function DashBoard() {
    const { user } = React.useContext(AuthContext);
    const email = user?.getEmail();
    const authorities = user?.getAuthorities();
    const { t, i18n } = useTranslation();
    const roles = new Array;
    const permissions = new Array;
    const [showDetails, setShowDetails] = useState(true)
    authorities?.forEach(auth => {
        if (auth.startsWith('ROLE_')) {
            roles.push(auth.replaceAll('ROLE_', ''))
        } else {
            permissions.push(auth);
        }
    })
    const updateDetails = useCallback(

        (): void => setShowDetails(!showDetails),

        [showDetails]
    );

    return (
        <React.Fragment>
            {user !== null &&
                <Grid container direction={'row'} justifyContent="center" sx={{ backgroundColor: 'white', textAlign: 'center', height: '100%', width: '100%'}}>

                    {/* User Details */}
                    {showDetails &&
                        <Grid item mt="2%" >
                            <Paper>
                                <Typography>{t('My info:')}</Typography>


                                <UserBaseDetails email={email!}/>


                            </Paper>
                        </Grid>
                    }
                    {/* Calendar */}
                    
                    <Grid item mt="2%" ml="5%" >
                            <DashBoardRequestsComponent onShow={updateDetails} />
                       
                    </Grid>
                    
                </Grid>
            }

        </React.Fragment>
    )
}
