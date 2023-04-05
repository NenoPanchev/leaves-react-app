import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { DepartmentSearchFilterProps } from '../interfaces/department/departmentInterfaces';
import * as departmentService from '../../services/departmentService';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import { useFetchAllEmails } from '../../services/userService';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/GlobalConstants';


function DepartmentSearchFilter(props: DepartmentSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [admin, setAdmin] = React.useState('');
    const [employees, setEmployees] = React.useState<string[]>([]);
    const [offset, setOffset] = React.useState(DEFAULT_OFFSET);
    const [limit, setLimit] = React.useState<Number>(DEFAULT_LIMIT);
    const fetchAllFiltered = departmentService.useFetchAllFiltered();
    const userEmails = useFetchAllEmails(props.refreshCurrentState);    
    const { t } = useTranslation();
    const employeesPlaceholder = t('Employees');


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const filter = new FormData(event.currentTarget);
        
        if(employees) {
            employees.forEach(empl => {
                filter.append('employees[]', empl);
            })
        }
        
        const departments = fetchAllFiltered(props.refreshCurrentState, filter);
        props.setRoles(departments);
        props.setFilter(filter);
        props.setShouldFilter(true);
        props.refresh(props.refreshCurrentState + 1);
    }
    function clearFilter() {
        setName('');  
        setAdmin('');
        setEmployees([]);
        setOffset(DEFAULT_OFFSET);
        setLimit(DEFAULT_LIMIT);
        
        props.setShouldFilter(false);
        props.refresh(props.refreshCurrentState + 1);

    }

    return (
        <React.Fragment>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'row' }}>

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
                    name="admin"
                    autoComplete="admin"
                    value={admin}
                    onChange={(e) => {
                        setAdmin(e.target.value);
                    }}
                />
                <Autocomplete
                    multiple
                    id="employees"
                    options={userEmails}
                    size='small'
                    sx={{minWidth: '30%'}}
                    value={employees}
                    onChange={( event, newValue) => {
                        setEmployees(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin='normal'
                            label={t('Employees')}
                            placeholder={employeesPlaceholder}
                        />
                    )}
                />
                <TextField
                    margin="normal"
                    size='small'
                    sx={{width: '120px'}}
                    id="offset"
                    label={t('Offset')}
                    name="offset"
                    type='number'
                    autoComplete="offset"
                    value={offset}
                    onChange={(e) => {
                        setOffset(Number(e.target.value));
                    }}
                />
                <TextField
                    margin="normal"
                    size='small'
                    sx={{width: '120px'}}
                    id="limit"
                    label={t('Limit')}
                    name="limit"
                    type='number'
                    autoComplete="limit"
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                    }}
                />
                <Button
                    type='submit'
                    variant='outlined'
                    color='success'
                    size='small'
                    sx={{marginTop: '16px', marginBottom: '8px'}}
                >
                    {t('Search')}
                </Button>
                <IconButton 
                color='error'
                type='reset'
                sx={{marginTop: '16px',
                        marginBottom: '8px'}}
                onClick={clearFilter}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </React.Fragment>
    )
}

export default DepartmentSearchFilter;