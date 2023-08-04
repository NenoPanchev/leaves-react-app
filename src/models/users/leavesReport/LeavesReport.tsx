import { Typography, Accordion, AccordionSummary, Box, TablePagination } from '@mui/material';
import * as userService from '../../../services/userService';
import { useTranslation } from 'react-i18next';
import { IViewProps } from '../../interfaces/common/IViewProps';
import React from 'react';
import { IHistoryFilter } from '../../interfaces/user/LeavesReport/IHistoryFilter';
import { DEFAULT_LEAVES_REPORT_FILTER } from '../../../constants/GlobalConstants';
import HistoryTable from './HistoryTable';


export default function LeavesReport(props: IViewProps) {
    const [filter, setFilter] = React.useState<IHistoryFilter>(DEFAULT_LEAVES_REPORT_FILTER);
    const reportsPage = userService.useFetchLeavesAnnualReport(props.id, filter);
    const { t } = useTranslation();


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
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
            {reportsPage?.content.map((report) => {
                return (
                    <Accordion key={report.id} TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            className='accordion-summary'
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{ width: '8%', flexShrink: 0 }}>{report.calendarYear}</Typography>

                            <HistoryTable {...report} />
                        </AccordionSummary>
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