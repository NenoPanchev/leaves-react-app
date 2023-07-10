import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { DEFAULT_OFFSET, PERMISSIONS } from '../../constants/GlobalConstants';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { IRoleSearchFilterProps } from '../interfaces/role/IRoleSearchFilterProps';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../SearchFilter.css'


function RoleSearchFilter(props: IRoleSearchFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.filter.name);
    const [permissions, setPermissions] = React.useState<string[]>(props.filter.permissions);
    const { t } = useTranslation();


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        props.setFilter({ ...props.filter, name: name, permissions: permissions, offset: DEFAULT_OFFSET })
        props.refresh(props.refreshCurrentState + 1);
    }

    function clearFilter() {
        props.setFilter({ ...props.filter, name: '', permissions: [], offset: DEFAULT_OFFSET })
        props.refresh(props.refreshCurrentState + 1);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button startIcon={<FilterListIcon />} onClick={handleClickOpen} >

                <Typography variant="overline" >
                    {t(`DataGridToolBar.ManageFilters`)!}
                </Typography>

            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='lg'
            >
                <Grid container
                    alignItems="center"
                    justifyContent="center">
                    <DialogTitle alignItems="center">{t(`ListAllFilters.Filter`)!}</DialogTitle>
                </Grid>
                <Box className='searchForm' component="form" onSubmit={handleSubmit} noValidate >
                    <DialogContent className='filterBar' sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            margin="normal"
                            size='small'
                            id="name"
                            label={t('Name')}
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <Autocomplete
                            multiple
                            id="permissions"
                            options={PERMISSIONS}
                            size='small'
                            sx={{ minWidth: '40%' }}
                            value={permissions}
                            onChange={(event, newValue) => {
                                setPermissions(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin='normal'
                                    label={t('Permissions')}
                                    placeholder={t('Permissions')!}
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction={'row-reverse'}>
                            <Button
                                type='submit'
                                onClick={clearFilter}>
                                <CloseIcon />
                                {t('Clear')}
                            </Button>
                            <Button
                                type='submit'
                                startIcon={<FilterAltIcon />}>
                                {t('Filter')}
                            </Button>
                        </Grid>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    )
}

export default RoleSearchFilter;