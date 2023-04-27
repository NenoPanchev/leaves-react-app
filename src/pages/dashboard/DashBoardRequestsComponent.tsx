import { Grid, Paper } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
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

    const [requestsComponentHeight, setRequestsComponentHeight] = React.useState("auto");
    const [requestsComponentWidth, setRequestsComponentWidth] = React.useState("auto");

    const [initialStartDate, setInitialStartDate] = React.useState<Dayjs | null>(dayjs());
    const [initialEndDate, setinitialEndDate] = React.useState<Dayjs | null>(dayjs());

    const reloadCalendar = () => {
        if (calendarRef && calendarRef.current) {
            calendarRef.current.reload();
        }
    }

    const changeDate = useCallback(

        (startDate: Dayjs | null, endDate: Dayjs | null): void => showAddRequestCallback(startDate, endDate),


        []

    );

    function handleZoomClick() {
        props.onShow()


        if (requestsComponentHeight === "auto" && requestsComponentWidth === "auto") {
            setRequestsComponentHeight("85vh")
            setRequestsComponentWidth("173vh")
        }
        else {
            setRequestsComponentHeight("auto")
            setRequestsComponentWidth("auto")
        }
    }
    const calendarDayChange = (startDate: Dayjs | null, endDate: Dayjs | null) => {
        console.log("calendarDayChange")
        if (AddRequestBaseRef && AddRequestBaseRef.current) {
            console.log("calendarDayChangeIFFFFFFFFF")
            AddRequestBaseRef.current.onCalendarChange(startDate, endDate);
        }
    }
    const showAddRequestFc = useCallback(

        (): void => setShowAddRequest(!showAddRequest),

        [showAddRequest]
    );

    function showAddRequestCallback(startDate: Dayjs | null, endDate: Dayjs | null) {
        console.log("showAddRequestCallback")
        calendarDayChange(startDate,endDate)
        setInitialStartDate(startDate);
        setinitialEndDate(endDate);
        console.log(initialStartDate)
        console.log(initialEndDate)
    }


    const updateAddRequestComponent = useCallback(

        (): void => setShowAddRequest(false),

        [setShowAddRequest]
    );

    return (
        <Grid container justifyContent="center" height={requestsComponentHeight} width={requestsComponentWidth} >
            <Paper sx={{ height: "fit-content" }} >
                <Grid item>
                    <CalendarBase ref={calendarRef} onDateChange={changeDate} onShow={handleZoomClick} onShowAddRequest={showAddRequestFc} />
                    {showAddRequest &&

                        <Grid item>
                            <AddRequestBase ref={AddRequestBaseRef} onSubmit={reloadCalendar} onClose={updateAddRequestComponent} 
                            initialStartDate={initialStartDate} initialendDate={initialEndDate} />
                        </Grid>
                    }
                </Grid>
            </Paper>

        </Grid>


    )
}
export default DashBoardRequestsComponent;
