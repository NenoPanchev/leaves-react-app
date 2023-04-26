
import { Grid, Paper } from '@mui/material';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarBase, { CalendarBaseRef } from '../../components/calendar/CalendarBase';
import AddRequestBase, { AddRequestBaseRef } from '../../models/AddRequest/AddRequestBase';



type DashBoardRequestsComponentProps = {

    onShow: () => void;
}

const DashBoardRequestsComponent = (props: DashBoardRequestsComponentProps): JSX.Element => {

    const calendarRef = React.useRef<CalendarBaseRef>(null);
    const AddRequestBaseRef = React.useRef<AddRequestBaseRef>(null);
    const { t, i18n } = useTranslation();
    const [showAddRequest, setShowAddRequest] = React.useState<boolean>(false);
    
    const [requestsComponentHeight,setRequestsComponentHeight]=React.useState("auto");
    const [requestsComponentWidth,setRequestsComponentWidth]=React.useState("auto");


    const reloadCalendar = () => {
        if (calendarRef && calendarRef.current) {
            calendarRef.current.reload();
        }
    }
    const changeDate = useCallback(

        (startDate: Dayjs | null, endDate: Dayjs | null): void => calendarDayChange(startDate, endDate),


        []

    );

    function handleZoomClick() {
        props.onShow()

      
        if(requestsComponentHeight==="auto"&&requestsComponentWidth==="auto")
        {
            setRequestsComponentHeight("85vh")
            setRequestsComponentWidth("173vh")
        }
        else
        {
            setRequestsComponentHeight("auto")
            setRequestsComponentWidth("auto")
        }
    }
    const calendarDayChange = (startDate: Dayjs | null, endDate: Dayjs | null) => {
        if (AddRequestBaseRef && AddRequestBaseRef.current) {
            AddRequestBaseRef.current.onCalendarChange(startDate, endDate);
        }
    }
    const updateDetails = useCallback(

        (): void => setShowAddRequest(!showAddRequest),

        [showAddRequest]
    );
    const updateAddRequestComponent = useCallback(

        (): void =>   setShowAddRequest(false),

        [setShowAddRequest]
    );

    return (
        <Grid container justifyContent="center"  height={requestsComponentHeight} width={requestsComponentWidth} >
                <Paper  sx={{height:"fit-content"}} >
            <Grid item>
            <CalendarBase ref={calendarRef} onDateChange={changeDate} onShow={handleZoomClick} onShowAddRequest={updateDetails} />
            {showAddRequest &&

                <Grid item>
                       <AddRequestBase ref={AddRequestBaseRef} onSubmit={reloadCalendar} onClose={updateAddRequestComponent} />
                </Grid>
            }
            </Grid>
            </Paper>

        </Grid>


    )
}
export default DashBoardRequestsComponent;