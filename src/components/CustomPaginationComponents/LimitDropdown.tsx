import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
type AddFilterProps = {
    value:number,
    onChange: (newValue: any) => void;
}

const LimitDropDown: React.FC<AddFilterProps> = (props): JSX.Element => {
    const[t]=useTranslation();
    return (
        <React.Fragment>
            <Box noValidate component="form">
                        <FormControl sx={{ minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-label">{t('limit')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="my-input"
                                label="Limit"
                                defaultValue={props.value}
                                onChange={(event) =>  props.onChange(event.target.value)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                                <MenuItem value={1000}>1000</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
        </React.Fragment>
    );
}
export default LimitDropDown;