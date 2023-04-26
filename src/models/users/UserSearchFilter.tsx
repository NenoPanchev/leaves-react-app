import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { UserSearchFilterProps } from '../interfaces/user/userInterfaces';
import { useFetchAllNames } from '../../services/roleService';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_OFFSET } from '../../constants/GlobalConstants';
import '../SearchFilter.css'


function UserSearchFilter(props: UserSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [roles, setRoles] = React.useState<string[]>([]);
    const navigate = useNavigate();
    const roleNames = useFetchAllNames(props.refreshCurrentState);
    if (!roleNames.includes('SUPER_ADMIN')) {
        roleNames.unshift('SUPER_ADMIN');
    }
    const { t } = useTranslation();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();

        props.setFilter({...props.filter, name: name, email: email, department: department,
            roles: roles, offset: DEFAULT_OFFSET})

        props.refresh(props.refreshCurrentState + 1);
    }

    function clearFilter() {
        setName('');  
        setEmail('');
        setDepartment('');
        setRoles([]);

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
                            placeholder={t('Roles')!}
                        />
                    )}
                />
                <Button
                    type='submit'
                    variant='outlined'
                    color='success'
                    size='small'
                    sx={{marginTop: '16px',
                        marginBottom: '8px',
                        minWidth: 'auto'}}
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

export default UserSearchFilter;