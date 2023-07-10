import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogContent, FormControl, Input, FormHelperText, DialogActions, Grid, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import PreviewIcon from '@mui/icons-material/Preview';
import LeavesReport from './LeavesReport';
import grey from '@mui/material/colors/grey';
type LeavesReportDialogProps = {
    id: number,
    // onChange: (newValue: string) => void;
}
const LeavesReportMemo = React.memo(LeavesReport);
const LeavesReportDialog: React.FC<LeavesReportDialogProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    let value: string = "";
    const [t, i18n] = useTranslation();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        // if (!!!(value === "")) {
        //     props.onChange(value);
        // }

        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button  startIcon={<PreviewIcon style={{ color: grey[700] }} />} onClick={handleClickOpen}>
                <Typography variant="overline" color={grey[700]} >{t('leavesReport')}</Typography>
             </Button>


            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent>
                    
                    <LeavesReportMemo id={props.id}/>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default LeavesReportDialog;