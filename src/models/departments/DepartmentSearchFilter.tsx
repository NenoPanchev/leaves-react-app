import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { DepartmentSearchFilterProps } from '../interfaces/department/departmentInterfaces';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import { useFetchAllEmails } from '../../services/userService';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { DEFAULT_OFFSET } from '../../constants/GlobalConstants';
import '../SearchFilter.css'

function DepartmentSearchFilter(props: DepartmentSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [adminEmail, setAdminEmail] = React.useState('');
    const [employeeEmails, setEmployeeEmails] = React.useState<string[]>([]);

    const userEmails = useFetchAllEmails(props.refreshCurrentState);    
    const { t } = useTranslation();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();

        props.setFilter({...props.filter, name: name, adminEmail: adminEmail, 
            employeeEmails: employeeEmails, offset: DEFAULT_OFFSET})
        props.refresh(props.refreshCurrentState + 1);
    }
    function clearFilter() {
        setName('');  
        setAdminEmail('');
        setEmployeeEmails([]);
        
        props.refresh(props.refreshCurrentState + 1);

    }

    return (
        <React.Fragment>
            <Box className='searchForm' component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'row' }}>

                <TextField
                    margin="normal"
                    size='small'
                    required
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
                    sx={{minWidth: '30%'}}
                    value={employeeEmails}
                    onChange={( event, newValue) => {
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
                <Button
                    type='submit'
                    variant='outlined'
                    color='success'
                    size='small'
                    sx={{marginTop: '16px', marginBottom: '8px', minWidth: 'auto'}}
                >
                    <SearchIcon />
                    {t('Search')}
                </Button>
                <Button
                    type='submit'
                    variant='outlined'
                    color='error'
                    size='small'
                    sx={{marginTop: '16px',
                        marginBottom: '8px',
                        minWidth: 'auto'}}
                        onClick={clearFilter}
                >
                    <CloseIcon />
                    {t('Clear')}
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default DepartmentSearchFilter;