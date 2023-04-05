import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { RoleSearchFilterProps } from '../interfaces/role/roleInterfaces';
import * as roleService from '../../services/roleService';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import { DEFAULT_LIMIT, DEFAULT_OFFSET, PERMISSIONS } from '../../constants/GlobalConstants';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function RoleSearchFilter(props: RoleSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [permissions, setPermissions] = React.useState<string[]>([]);
    const [offset, setOffset] = React.useState(DEFAULT_OFFSET);
    const [limit, setLimit] = React.useState<Number>(DEFAULT_LIMIT);
    const fetchAllFiltered = roleService.useFetchAllFiltered();
    const { t } = useTranslation();
    const permissionsPlaceholder = t('Permissions');



    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const filter = new FormData(event.currentTarget);

        if (permissions) {
            permissions.forEach(p => {
                filter.append('permissions[]', p);
            })

        }

        const roles = fetchAllFiltered(props.refreshCurrentState, filter);
        props.setRoles(roles);
        props.setFilter(filter);
        props.setShouldFilter(true);
        props.refresh(props.refreshCurrentState + 1);
    }

    function clearFilter() {
        setName('');
        setPermissions([]);
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
                            placeholder={permissionsPlaceholder}
                        />
                    )}
                />
                <TextField
                    margin="normal"
                    size='small'
                    sx={{ width: '120px' }}
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
                    sx={{ width: '120px' }}
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
                    sx={{ marginTop: '16px', marginBottom: '8px' }}
                >
                    {t('Search')}
                </Button>
                <IconButton
                    color='error'
                    type='reset'
                    sx={{
                        marginTop: '16px',
                        marginBottom: '8px'
                    }}
                    onClick={clearFilter}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </React.Fragment>
    )
}

export default RoleSearchFilter;