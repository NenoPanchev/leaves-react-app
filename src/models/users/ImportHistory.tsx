import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Tooltip
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import PublishIcon from '@mui/icons-material/Publish';
import { useFetchEmployeeInfoHistory, useImportHistory } from '../../services/userService';

import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { IDeleteButtonProps } from '../interfaces/common/IDeleteButtonProps';

export default function ImportHistoryButton(props: IDeleteButtonProps) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const [serverErrorMessage, setServerErrorMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<boolean>(false);
    let sError = false;
    const { user } = React.useContext(AuthContext);
    const daysUsedHistory = useFetchEmployeeInfoHistory(props.id);
    const importHistory = useImportHistory();
    let serverResponse = '';


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let errors = validate();
        if (errors) {
            return;
        }
        serverResponse = await importHistory(props.id, data);
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
                label={t('Edit')}
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {t('Edit') + t('User')}
                </DialogTitle>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <DialogContent>
                    {/* {daysUsedHistory!.map((year, index) => (
                        <TextField
                            key={index}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={t('Name')}
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={nameError}
                            helperText={nameError ? t('Username must be between 2 and 20 characters') : null}
                        />
                        ))} */}
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