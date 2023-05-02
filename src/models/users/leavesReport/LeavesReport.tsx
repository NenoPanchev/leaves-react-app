import { Typography, Accordion, AccordionSummary, AccordionDetails, Box, TablePagination } from '@mui/material';
import * as userService from '../../../services/userService';
import { useTranslation } from 'react-i18next';
import { IViewProps } from '../../interfaces/common/IViewProps';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContractTable from './ContractTable';
import AnnualReportTable from './AnnualReportTable';
import './LeavesReport.css'
import React from 'react';
import { ILeavesAnnualReportFilter as ILeavesReportFilter } from '../../interfaces/user/LeavesReport/ILeavesAnnualReportFilter';
import { DEFAULT_LEAVES_REPORT_FILTER } from '../../../constants/GlobalConstants';


export default function LeavesReport(props: IViewProps) {
    const [filter, setFilter] = React.useState<ILeavesReportFilter>(DEFAULT_LEAVES_REPORT_FILTER);
    const reportsPage = userService.useFetchLeavesAnnualReport(props.id, filter);
    const { t } = useTranslation();
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        // setPage(newPage);
        setFilter({...filter, offset: filter.limit * newPage})
        
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setFilter({...filter, limit: parseInt(event.target.value, 10)})
      };

    return (
        <Box marginTop={'15px'} marginBottom={'5px'} >
            <Typography>{t('Leaves report')}</Typography>
            {reportsPage?.content.map((report, index) => {
                return (
                    <Accordion key={index} TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            className='accordion-summary'
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{ width: '8%', flexShrink: 0 }}>{report.year}</Typography>

                            <AnnualReportTable {...report} />
                        </AccordionSummary>
                        <AccordionDetails>
                            <ContractTable {...report}></ContractTable>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
            <TablePagination
                component="div"
                count={reportsPage.totalElements}
                page={reportsPage.number}
                onPageChange={handleChangePage}
                rowsPerPage={reportsPage.size}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[1, 3, 5, 10, { label: 'All', value: 100 }]}
            />
        </ Box>
    );
}