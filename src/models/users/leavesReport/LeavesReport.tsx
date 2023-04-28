import * as React from 'react';
import { Grid, Card, Table, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import * as userService from '../../../services/userService';
import { useTranslation } from 'react-i18next';
import { IViewProps } from '../../interfaces/common/IViewProps';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContractTable from './ContractTable';
import AnnualReportTable from './AnnualReportTable';
import './LeavesReport.css'


export default function LeavesReport(props: IViewProps) {
    const reports = userService.useFetchLeavesAnnualReport(props.id);
    const { t } = useTranslation();

    function parseDouble(number: number) {
        const numberToString = number.toString();
        if (number % 1 === 0) {
            return numberToString;
        }
        let decimal = parseFloat(numberToString).toFixed(2);
        const result = decimal + ' (' + Math.round(number) + ')';
        return result;
    }

    return (
        <Box marginTop={'15px'} >
            <Typography>{t('Leaves report')}</Typography>
            {reports?.map((report, index) => {
                

                return (
                    <Accordion key={index} TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            className='accordion-summary'
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{ width: '8%', flexShrink: 0 }}>{report.year}</Typography>
                        
                        <AnnualReportTable {...report}/>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ContractTable {...report}></ContractTable>
                        </AccordionDetails>
                    </Accordion>
                );
            })}

        </ Box>
    );
}