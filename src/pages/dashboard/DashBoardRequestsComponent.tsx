import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import * as React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarBase, { CalendarBaseRef } from '../../components/calendar/CalendarBase';
import AuthContext from '../../contexts/AuthContext';
import AddRequestBase, { AddRequestBaseRef } from '../../models/AddRequest/AddRequestBase';
import { Grid, Paper, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';
import { Dayjs } from 'dayjs';
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({

    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '&.MuiAccordion-rounded': {

    },

}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}

    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },


}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',

}));



type DashBoardRequestsComponentProps = {

    onShow: () => void;
}

const DashBoardRequestsComponent = (props: DashBoardRequestsComponentProps): JSX.Element => {

    const calendarRef = React.useRef<CalendarBaseRef>(null);
    const AddRequestBaseRef = React.useRef<AddRequestBaseRef>(null);
    const { user } = React.useContext(AuthContext);
    const authorities = user?.getAuthorities();
    const { t, i18n } = useTranslation();
    const roles = new Array;
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [showAddRequest, setShowAddRequest] = React.useState<boolean>(false);
    const [addRequestDirection,setAddRequestDirection]=React.useState<any>("column");
    const [requestsComponentHeight,setRequestsComponentHeight]=React.useState("auto");
    const [requestsComponentWidth,setRequestsComponentWidth]=React.useState("auto");


    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

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

        if(addRequestDirection==="column")
        {
            setAddRequestDirection("row-reverse");
        }
        else
        {
            setAddRequestDirection("column")
        }
        if(requestsComponentHeight==="auto"&&requestsComponentWidth==="auto")
        {
            setRequestsComponentHeight("90.8vh")
            setRequestsComponentWidth("179vh")
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
    const updateDrawer = useCallback(

        (): void => setExpanded(false),

        [setExpanded]
    );

    return (
        <Grid container justifyContent="center" direction={addRequestDirection} height={requestsComponentHeight} width={requestsComponentWidth} >
                <Paper  sx={{height:"fit-content"}} >
            <Grid item>
            <CalendarBase ref={calendarRef} onDateChange={changeDate} onShow={handleZoomClick} onShowAddRequest={updateDetails} />
            {showAddRequest &&

                <Grid item>
                    {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>{t('AddRequests.AddRequest')}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <AddRequestBase ref={AddRequestBaseRef} onSubmit={reloadCalendar} onClose={updateDrawer} />
                        </AccordionDetails>
                    </Accordion> */}
                       <AddRequestBase ref={AddRequestBaseRef} onSubmit={reloadCalendar} onClose={updateDrawer} />
                </Grid>
       
            }
            </Grid>
            </Paper>

        </Grid>


    )
}
export default DashBoardRequestsComponent;