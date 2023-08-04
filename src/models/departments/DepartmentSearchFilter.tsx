import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { DEFAULT_OFFSET } from '../../constants/GlobalConstants';
import { IDepartmentSearchFilterProps } from '../interfaces/department/IDepartmentSearchFilterProps';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../SearchFilter.css'

function DepartmentSearchFilter(props: IDepartmentSearchFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.filter.name);
    const [adminEmail, setAdminEmail] = React.useState(props.filter.adminEmail);
    const [employeeEmails, setEmployeeEmails] = React.useState<string[]>(props.filter.employeeEmails);

    const userEmails =props.allEmails;
    const { t } = useTranslation();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        props.setFilter({
            ...props.filter, name: name, adminEmail: adminEmail,
            employeeEmails: employeeEmails, offset: DEFAULT_OFFSET
        })
        props.refresh(props.refreshCurrentState + 1);
    }
    function clearFilter() {
        props.setFilter({
            ...props.filter, name: '', adminEmail: '',
            employeeEmails: [], offset: DEFAULT_OFFSET
        })
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
                        <TextField
                            margin="normal"
                            size='small'
                            id="admin"
                            label={t('Admin')}
                            name="adminEmail"
                            autoComplete="admin"
                            value={adminEmail}
                            onChange={(e) => {
                                setAdminEmail(e.target.value);
                            }}
                        />
                        <Autocomplete
                            multiple
                            id="employeeEmails"
                            options={userEmails}
                            size='small'
                            sx={{ minWidth: '30%' }}
                            value={employeeEmails}
                            onChange={(event, newValue) => {
                                setEmployeeEmails(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin='normal'
                                    label={t('Employees')}
                                    placeholder={t('Employees')!}
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

export default DepartmentSearchFilter;