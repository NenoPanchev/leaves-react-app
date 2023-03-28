import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { DepartmentSearchFilterProps } from '../interfaces/department/departmentInterfaces';
import * as departmentService from '../../services/departmentService';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import { useFetchAllEmails } from '../../services/userService';


function DepartmentSearchFilter(props: DepartmentSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [admin, setAdmin] = React.useState('');
    const [employees, setEmployees] = React.useState<string[] | null>(null);
    const fetchAllFiltered = departmentService.useFetchAllFiltered();
    const userEmails = useFetchAllEmails(props.refreshCurrentState);    


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


    return (
        <React.Fragment>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'row' }}>

                <TextField
                    margin="normal"
                    size='small'
                    required
                    id="name"
                    label="Name"
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
                    label="Admin"
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
                    onChange={( event, newValue) => {
                        setEmployees(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin='normal'
                            label="Employees"
                            placeholder="Employees"
                        />
                    )}
                />
                <Button
                    type='submit'
                    variant='outlined'
                    color='success'
                    size='small'
                    sx={{marginTop: '16px', marginBottom: '8px'}}
                >
                    Search
                </Button>

            </Box>
        </React.Fragment>
    )
}

export default DepartmentSearchFilter;