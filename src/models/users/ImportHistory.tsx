import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Tooltip, Typography
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import PublishIcon from '@mui/icons-material/Publish';
import { useFetchEmployeeInfoHistory, useImportHistory } from '../../services/userService';

import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { IDeleteButtonProps } from '../interfaces/common/IDeleteButtonProps';
import { IDaysUsedHistory } from '../interfaces/user/IDaysUsedHistory';
import { useEffect } from 'react';

export default function ImportHistoryButton(props: IDeleteButtonProps) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<boolean>(false);
    let sError = false;
    const { user } = React.useContext(AuthContext);
    const [daysUsedHistory, setDaysUsedHistory] = React.useState<IDaysUsedHistory>({});
    const history = useFetchEmployeeInfoHistory(props.id);
    const importHistory = useImportHistory();
    useEffect(() => {
        if (history) {
            setDaysUsedHistory(history);
        }
    }, [history]);
    let serverResponse = '';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDaysUsedHistory((prevFormData) => ({
            ...prevFormData,
            [name]: parseInt(value) || 0,
        }));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let errors = validate();
        if (errors) {
            return;
        }
        serverResponse = await importHistory(props.id, daysUsedHistory);
        setServerErrorMessage(serverResponse);
        errors = validate();

        if (errors) {
            return;
        }
        props.refresh(props.refreshCurrentState + 1);
        handleClose();
    }

    function validate(): boolean {
        sError = serverResponse !== '';
        setServerError(serverResponse !== '');
        return sError;
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
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {t('Import days used history of employees before using this app')}
                </DialogTitle>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <DialogContent>
                        {serverError &&
                            <Typography component="h2" variant="subtitle2" color="red" align='center'>{serverErrorMessage}</Typography>
                        }
                        {Object.keys(daysUsedHistory!).map((year) => (
                            <TextField
                                key={year}
                                margin="normal"
                                required
                                fullWidth
                                label={year}
                                name={year}
                                autoComplete={year}
                                autoFocus
                                value={daysUsedHistory![parseInt(year)]}
                                onChange={handleInputChange}
                                type="number"
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
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