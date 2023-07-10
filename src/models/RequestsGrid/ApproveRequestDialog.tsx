import DoneIcon from '@mui/icons-material/Done';
import { Button, Dialog, DialogActions, DialogContent, Grid, Tooltip } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell/GridActionsCellItem';
import { GridApiCommunity } from '@mui/x-data-grid/models/api/gridApiCommunity';
import { GridRowId } from '@mui/x-data-grid/models/gridRows';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RequestService from '../../services/RequestService';
import IAlertProps from '../interfaces/errors/IAlertProps';
import IRequestDataApprove from '../interfaces/request/IRequestDataAprove';
import IRequestDataGet from '../interfaces/request/IRequestDataGet';

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

type ApproveRequestProps = {
    request: IRequestDataGet,
    rowId: GridRowId,
    apiRef: GridApiCommunity,
    onClick: (newValue: IAlertProps) => void;
}

const ApproveRequestDialog: React.FC<ApproveRequestProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [leaveRequestDto, setLeaveRequestDto] = React.useState<IRequestDataApprove>({

        startDate: props.request.startDate,
        endDate: props.request.endDate,
        approvedStartDate: props.request.startDate,
        approvedEndDate: props.request.endDate,

    })
    const maxDate=dayjs(props.request.endDate)
    const minDate=dayjs(props.request.startDate)
    const [alertProps, setAlertProps] = useState<IAlertProps>(
        {
          hasError: false,
          message: "",
          type: "",
          open: false
        }
      );
    const [t, i18n] = useTranslation();
    const handleClickOpen = () => {
        if(props.request.approved==null)
        {
            setOpen(true);
        }else
        {
            props.onClick({ ...alertProps, message: "", hasError: true, open: true, type: "Approve" })
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApprove = async () => {
        await RequestService.approve(props.request.id, leaveRequestDto)
            .then((_response: any) => {
                props.apiRef.updateRows([{ id: props.rowId, approved: true
                    , approvedStartDate:leaveRequestDto.approvedStartDate?.toString()
                    ,approvedEndDate:leaveRequestDto.approvedEndDate?.toString() }]);
            })
            .catch((e: AxiosError<any, any>) => {
                if (e.response) {
                    console.log();
                }

            });
        setOpen(false);
    };


    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Tooltip title={t('approve')} onClick={handleClickOpen}><DoneIcon /></Tooltip>}
                label="Delete"
                className="textPrimary"
                onClick={handleClickOpen}
                color="inherit"
            />

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
            >

                <DialogContent >

                    <Grid container justifySelf="center"  width="78vh" ml="5%" mr="-2%">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')! } >
                            <Grid item direction="row" marginBottom="1.5vh">
                                <DatePicker label="Start date" defaultValue={dayjs(props.request.startDate)} disabled/>
                                <DatePicker label="End date" defaultValue={dayjs(props.request.endDate)} disabled />
                                
                            </Grid>

                            <Grid item direction="row">
                                <DatePicker label="Approved start date"
                                    value={dayjs(leaveRequestDto.approvedStartDate)}
                                    minDate={minDate}
                                    maxDate={dayjs(leaveRequestDto.approvedEndDate)}
                                    onChange={(newValue) => setLeaveRequestDto({ ...leaveRequestDto, approvedStartDate: newValue?.format("YYYY-MM-DD")})} />
                                <DatePicker label="Approved end date"
                                    value={dayjs(leaveRequestDto.approvedEndDate)}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    onChange={(newValue) => setLeaveRequestDto({ ...leaveRequestDto, approvedEndDate: newValue?.format("YYYY-MM-DD")})} />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>


                </DialogContent>


                <DialogActions >
                    <Grid container justifyContent="flex-end">
                    <Button onClick={handleApprove} >{t(`Approve`)!}</Button>
                    <Button onClick={handleClose} >{t(`Close`)!}</Button>
                    </Grid>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
}
export default ApproveRequestDialog;
