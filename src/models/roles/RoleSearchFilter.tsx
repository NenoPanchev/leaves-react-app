import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import { DEFAULT_OFFSET, PERMISSIONS } from '../../constants/GlobalConstants';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IRoleSearchFilterProps } from '../interfaces/role/IRoleSearchFilterProps';
import '../SearchFilter.css'


function RoleSearchFilter(props: IRoleSearchFilterProps) {
    const [name, setName] = React.useState('');
    const [permissions, setPermissions] = React.useState<string[]>([]);
    const { t } = useTranslation();


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();     
        props.setFilter({...props.filter, name: name, permissions: permissions, offset: DEFAULT_OFFSET})
        props.refresh(props.refreshCurrentState + 1);
    }

    function clearFilter() {
        setName('');
        setPermissions([]);
    
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
                            placeholder={t('Permissions')!}
                        />
                    )}
                />
                <Button
                    type='submit'
                    variant='outlined'
                    color='success'
                    size='small'
                    sx={{ marginTop: '16px', marginBottom: '8px', minWidth: 'auto'}}
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

export default RoleSearchFilter;