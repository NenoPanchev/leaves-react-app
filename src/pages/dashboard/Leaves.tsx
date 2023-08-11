import React from 'react';
import { Grid, IconButton } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateCalendarServerRequest from '../../components/calendar/CalendarAllEmployees';
import LeavesGrid from "./LeavesGrid";



export default function Leaves() {
    const [view, setView] = React.useState('calendar');

    const onClickSetViewCalendar = (e: any) => {
        setView('calendar');
    }
    const onClickSetViewTable = (e: any) => {
        setView('table');
    }

    return (
        <React.Fragment>
                <Grid >
                    {view === 'calendar'
                        ? <IconButton onClick={onClickSetViewTable}>
                            <TableChartIcon fontSize='large' />
                        </IconButton>
                        : <IconButton onClick={onClickSetViewCalendar}>
                            <CalendarMonthIcon fontSize='large' />
                        </IconButton>
                    }
                </Grid>
                <Grid container  direction={'row'} >
                    {view === 'calendar'
                        ? <DateCalendarServerRequest />
                        : <LeavesGrid />
                    }
                </Grid>
        </React.Fragment>
    )
}