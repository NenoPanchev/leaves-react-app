import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { UserSearchFilterProps } from '../interfaces/user/userInterfaces';
import * as userService from '../../services/userService';
import { useFetchAllNames } from '../../services/roleService';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/GlobalConstants';


function UserSearchFilter(props: UserSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [offset, setOffset] = React.useState(DEFAULT_OFFSET);
    const [limit, setLimit] = React.useState<Number>(DEFAULT_LIMIT);
    const [roles, setRoles] = React.useState<string[]>([]);
    const navigate = useNavigate();
    const fetchAllFiltered = userService.useFetchAllFiltered();
    const roleNames = useFetchAllNames(props.refreshCurrentState);
    const { t } = useTranslation();
    const rolesPlaceholder = t('Roles');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const filter = new FormData(event.currentTarget);
        
        if(roles) {
            roles.forEach(r => {
                filter.append('roles[]', r);
            })   
        }
        
        const users = fetchAllFiltered(props.refreshCurrentState, filter);
        props.setFilter(filter);
        props.setShouldFilter(true);
        props.refresh(props.refreshCurrentState + 1);
    }

    function clearFilter() {
        setName('');  
        setEmail('');
        setDepartment('');
        setRoles([]);
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
                    label={t('Email')}
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
                    label={t('Department')}
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
                    size='small'
                    sx={{minWidth: '20%'}}
                    value={roles}
                    onChange={( event, newValue) => {
                        setRoles(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin='normal'
                            label={t('Roles')}
                            placeholder={rolesPlaceholder}
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
                    sx={{marginTop: '16px',
                        marginBottom: '8px'}}
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

export default UserSearchFilter;