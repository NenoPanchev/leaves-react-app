import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { RoleSearchFilterProps } from '../interfaces/role/roleInterfaces';
import * as roleService from '../../services/roleService';
import { Autocomplete } from '@mui/material';
import CustomizedHook from '../../components/common/CustomizedHook';
import Tags from '../../components/common/Tags';


function RoleSearchFilter(props: RoleSearchFilterProps) {
    const [name, setName] = React.useState('');
    const formRef = React.useRef<HTMLFormElement>(null);


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        console.log('hi');

        event.stopPropagation();
        event.preventDefault()
        const filter = new FormData(event.currentTarget);
        const roles = roleService.useFetchAllFiltered(props.refreshCurrentState, filter);
        props.setRoles(roles);
        console.log(roles);
        return false;
    }


    return (
        <React.Fragment>
            <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'row' }}>

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
                        if (formRef.current) {
                            formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                        }
                    }}
                />
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[top100Films[13]]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Multiple values"
                            placeholder="Favorites"
                        />
                    )}
                />
                {/* <CustomizedHook></CustomizedHook>
                <Tags></Tags> */}
                <button type='submit'>asdas</button>
            </Box>
        </React.Fragment>
    )
}

export default RoleSearchFilter;