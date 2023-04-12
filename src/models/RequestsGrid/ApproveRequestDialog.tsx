import { Button, Dialog, DialogActions, DialogContent, Grid, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import IRequestDataGet from '../interfaces/request/IRequestDataGet';
import { DateField } from '@mui/x-date-pickers/DateField/DateField';
import dayjs, { Dayjs } from 'dayjs';
import RequestService from '../../services/RequestService';
import { AxiosError } from 'axios';
import { GridRowId } from '@mui/x-data-grid/models/gridRows';
import { GridApiCommunity } from '@mui/x-data-grid/models/api/gridApiCommunity';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DoneIcon from '@mui/icons-material/Done';
import IRequestDataApprove from '../interfaces/request/IRequestDataAprove';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell/GridActionsCellItem';
import IAlertProps from '../interfaces/errors/IAlertProps';
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

type ApproveRequestProps = {
    request: IRequestDataGet,
    rowId: GridRowId,
    apiRef: GridApiCommunity,
    onClick: (newValue: IAlertProps) => void;
}

const ApproveRequestDialog: React.FC<ApproveRequestProps> = (props): JSX.Element => {
    console.log("line 24 ApproveRequestDialog ")
    console.log(props.request.startDate);
    console.log(dayjs(props.request.startDate).format());
    const [open, setOpen] = React.useState(false);
    const [leaveRequestDto, setLeaveRequestDto] = React.useState<IRequestDataApprove>({

        startDate: props.request.startDate,
        endDate: props.request.endDate,
        approvedStartDate: props.request.startDate,
        approvedEndDate: props.request.endDate,

    })
    const [alertProps, setAlertProps] = useState<IAlertProps>(
        {
          hasError: false,
          message: "",
          type: "",
          open: false
        }
      );
    console.log(props.request);
    const [t, i18n] = useTranslation();
    useEffect(() => {
        console.log("hereherehrerherherhe")
    }, []);
    const handleClickOpen = () => {
        if(props.request.approved==null)
        {
            setOpen(true);
        }else
        {
            props.onClick({ ...alertProps, message: props.request.id.toString(), hasError: true, open: true, type: "Approve" })
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApprove = async () => {
        console.log(leaveRequestDto);
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
            >

                <DialogContent >

                    <Grid container justifySelf="center" >
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('Calendar Locale')! } >
                            <Grid item direction="row" marginBottom="1.5vh">
                                <DatePicker label="Start date" defaultValue={dayjs(props.request.startDate)} disabled/>
                                <DatePicker label="End date" defaultValue={dayjs(props.request.endDate)} disabled />
                            </Grid>

                            <Grid item direction="row">
                                <DatePicker label="Approved start date"
                                    value={dayjs(leaveRequestDto.approvedStartDate)}
                                    onChange={(newValue) => setLeaveRequestDto({ ...leaveRequestDto, approvedStartDate: newValue?.toISOString() })} />
                                <DatePicker label="Approved end date"
                                    value={dayjs(leaveRequestDto.approvedEndDate)}
                                    onChange={(newValue) => setLeaveRequestDto({ ...leaveRequestDto, approvedEndDate: newValue?.toISOString() })} />
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
