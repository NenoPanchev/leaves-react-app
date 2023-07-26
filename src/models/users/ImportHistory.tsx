import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Tooltip, Typography, Grid
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import PublishIcon from '@mui/icons-material/Publish';
import { useFetchEmployeeInfoHistory, useImportHistory } from '../../services/userService';

import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { IDeleteButtonProps } from '../interfaces/common/IDeleteButtonProps';
import { useEffect } from 'react';
import { IHistory } from '../interfaces/user/IHistory';

export default function ImportHistoryButton(props: IDeleteButtonProps) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<boolean>(false);
    let sError = false;
    const { user } = React.useContext(AuthContext);
    const [historyArray, setHistoryArray] = React.useState<IHistory[]>([]);
    const [initialHistoryArray, setInitialHistoryArray] = React.useState<IHistory[]>([]);
    const history = useFetchEmployeeInfoHistory(props.id);
    const importHistory = useImportHistory();
    useEffect(() => {
        if (history) {
            setHistoryArray(history);
            setInitialHistoryArray(history)
        }
    }, [history]);
    let serverResponse = '';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        setHistoryArray(initialHistoryArray);
    };

    const handleFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
      ) => {
        const { name, value } = event.target;
        setHistoryArray((prevHistoryArray) => {
          const updatedHistoryArray = [...prevHistoryArray];
          const updatedHistory = {
            ...updatedHistoryArray[index],
            [name]: parseInt(value),
          };
          updatedHistory.daysLeft =
            updatedHistory.daysFromPreviousYear +
            updatedHistory.contractDays -
            updatedHistory.daysUsed;
          updatedHistoryArray[index] = updatedHistory;
          return updatedHistoryArray;
        });
      };
    


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let errors = validate();
        if (errors) {
            return;
        }
        serverResponse = await importHistory(props.id, historyArray);
        setServerErrorMessage(serverResponse);
        errors = validate();

        if (errors) {
            return;
        }
        props.refresh(props.refreshCurrentState + 1);
        handleClose();
    }

    function validate(): boolean {
        const hasNegativeValue = historyArray.some(
            (history) =>
              history.daysFromPreviousYear < 0 ||
              history.contractDays < 0 ||
              history.daysUsed < 0
          );
        sError = serverResponse !== '';
        setServerError(serverResponse !== '');
        return sError || hasNegativeValue;
    }

    if (!user?.hasAuthority('WRITE')) {
        return null;
    }

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Tooltip title={t('Import history')}><PublishIcon /></Tooltip>}
                label={t('Import history')}
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xl'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {t('Import days used history of employees before using this app')}
                </DialogTitle>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <DialogContent>
                        {serverError &&
                            <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography>
                        }
                        {historyArray.map((history, index) => (
                            <Grid container direction="row" key={index}>
                                <Typography component="h2" variant="subtitle2" color="red" align='center' marginTop={'auto'} marginBottom={'auto'} marginRight={'5px'}>{history.calendarYear}</Typography>
                                <TextField
                                    margin="dense"
                                    required
                                    label={t('From previous year')}
                                    name='daysFromPreviousYear'
                                    value={history.daysFromPreviousYear}
                                    type="number"
                                    onChange={(event) => handleFieldChange(event, index)}
                                    error={history.daysFromPreviousYear < 0}
                                    helperText={history.daysFromPreviousYear < 0 ? 'Negative numbers are not allowed': null}
                                />

                                <TextField
                                    margin="dense"
                                    required
                                    label={t('Contract days')}
                                    name='contractDays'
                                    value={history.contractDays}
                                    type="number"
                                    onChange={(event) => handleFieldChange(event, index)}
                                    error={history.contractDays < 0}
                                    helperText={history.contractDays < 0 ? 'Negative numbers are not allowed': null}
                                />
                                <TextField
                                    margin="dense"
                                    required
                                    label={t('Days used')}
                                    name='daysUsed'
                                    value={history.daysUsed}
                                    type="number"
                                    onChange={(event) => handleFieldChange(event, index)}
                                    error={history.daysUsed < 0}
                                    helperText={history.daysUsed < 0 ? 'Negative numbers are not allowed': null}
                                />
                                <TextField
                                    margin="dense"
                                    required
                                    disabled
                                    label={t('Days left')}
                                    name='daysUsed'
                                    value={history.daysLeft}
                                    type="number"
                                    onChange={(event) => handleFieldChange(event, index)}
                                    error={history.daysLeft < 0}
                                    helperText={history.daysLeft < 0 ? 'Negative numbers are not allowed': null}
                                />
                            </Grid>

                        ))}
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={handleReset}>
                            {t('Reset')}
                        </Button>
                        <Button autoFocus onClick={handleClose}>
                            {t('Close')}
                        </Button>
                        <Button
                            type='submit'
                            autoFocus>
                            {t('Submit')}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </ React.Fragment>
    );
}