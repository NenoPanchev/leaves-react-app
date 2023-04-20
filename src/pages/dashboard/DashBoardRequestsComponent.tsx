import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Grid, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarBase, { CalendarBaseRef } from '../../components/calendar/CalendarBase';
import AuthContext from '../../contexts/AuthContext';
import AddRequestBase, { AddRequestBaseRef } from '../../models/AddRequest/AddRequestBase';
import DrawerComponent from './DrawerComponent';
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
    '&.MuiAccordion-rounded':{

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






export default function DashBoardRequestsComponent() {
    const calendarRef = React.useRef<CalendarBaseRef>(null);
    const AddRequestBaseRef=React.useRef<AddRequestBaseRef>(null);
    const { user } = React.useContext(AuthContext);
    const authorities = user?.getAuthorities();
    const { t, i18n } = useTranslation();
    const roles = new Array;
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const reloadCalendar = ()=> {
        if(calendarRef && calendarRef.current) {
            calendarRef.current.reload();
        }
    }
    const changeDate = useCallback(

        (newValue: Dayjs|null): void => calendarDayChange(newValue),


        []

      );

      const calendarDayChange = (newValue: Dayjs|null)=> {
        if(AddRequestBaseRef && AddRequestBaseRef.current) {
            AddRequestBaseRef.current.onCalendarChange(newValue);
        }
    }
   
    const updateDrawer = useCallback(

        (): void =>  setExpanded(false),
    
        [setExpanded]
      );

    return (

        <Grid container direction="column">
            <CalendarBase ref={calendarRef} onDateChange={changeDate}/>
            <Grid item>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>{t('AddRequests.AddRequest')}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <AddRequestBase ref={AddRequestBaseRef} onSubmit={reloadCalendar} onClose={updateDrawer}/>
                </AccordionDetails>
            </Accordion>
        </Grid>
        </Grid>



    )
}