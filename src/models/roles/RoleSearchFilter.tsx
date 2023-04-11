import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { RoleSearchFilterProps } from '../interfaces/role/roleInterfaces';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import { PERMISSIONS } from '../../constants/GlobalConstants';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function RoleSearchFilter(props: RoleSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [permissions, setPermissions] = React.useState<string[]>([]);
    const { t } = useTranslation();
    const permissionsPlaceholder = t('Permissions');



    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();     
        props.setFilter({...props.filter, name: name, permissions: permissions, offset: 0})
        props.refresh(props.refreshCurrentState + 1);
    }

    function clearFilter() {
        setName('');
        setPermissions([]);
    
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
                    type='submit'
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