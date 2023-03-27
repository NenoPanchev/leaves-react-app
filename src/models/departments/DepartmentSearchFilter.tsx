import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { DepartmentSearchFilterProps } from '../interfaces/department/departmentInterfaces';
import * as departmentService from '../../services/departmentService';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import { PERMISSIONS } from '../../constants/GlobalConstants';



function DepartmentSearchFilter(props: DepartmentSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [admin, setAdmin] = React.useState('');
    const [employees, setEmployees] = React.useState<string[] | null>(null);
    const fetchAllFiltered = departmentService.useFetchAllFiltered();


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const filter = new FormData(event.currentTarget);
        
        if(employees) {
            employees.forEach(p => {
                filter.append('employees[]', p);
            })
            
        }
        
        console.log(filter);
        const departments = fetchAllFiltered(props.refreshCurrentState, filter);
        props.setRoles(departments);
        props.setFilter(filter);
        props.setShouldFilter(true);
        props.refresh(props.refreshCurrentState + 1);
        console.log(departments);
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
                <Button
                    type='submit'
                    variant='outlined'
                    color='success'
                    size='small'
                >
                    Search
                </Button>

            </Box>
        </React.Fragment>
    )
}

export default DepartmentSearchFilter;