import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { UserSearchFilterProps } from '../interfaces/user/userInterfaces';
import * as userService from '../../services/userService';
import { useFetchAllNames } from '../../services/roleService';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';


function UserSearchFilter(props: UserSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [department, setDepartment] = React.useState('');
    let [roles, setRoles] = React.useState<string[] | null>(null);
    const fetchAllFiltered = userService.useFetchAllFiltered();
    const roleNames = useFetchAllNames(props.refreshCurrentState)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const filter = new FormData(event.currentTarget);
        
        // if(roles) {
        //     roles.forEach(r => {
        //         filter.append('roles[]', r);
        //     })   
        // }
        
        console.log(filter);
        const roles = fetchAllFiltered(props.refreshCurrentState, filter);
        // props.setRoles(roles);
        props.setFilter(filter);
        props.setShouldFilter(true);
        props.refresh(props.refreshCurrentState + 1);
        console.log(roles);
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
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <TextField
                    margin="normal"
                    size='small'
                    required
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    margin="normal"
                    size='small'
                    required
                    id="department"
                    label="Department"
                    name="department"
                    autoComplete="department"
                    value={department}
                    onChange={(e) => {
                        setDepartment(e.target.value);
                    }}
                />
                <Autocomplete
                    multiple
                    id="users"
                    options={roleNames}
                    size='medium'
                    sx={{minWidth: '30%'}}
                    onChange={( event, newValue) => {
                        setRoles(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Roles"
                            placeholder="Roles"
                        />
                    )}
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

export default UserSearchFilter;