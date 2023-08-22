import * as React from 'react';
import { Box } from '@mui/system';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel, FormLabel,
    Grid,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select,
    Typography,
    Switch
} from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LEAVES_GRID_FILTER } from '../../constants/GlobalConstants';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
// import '../SearchFilter.css'
import {ILeavesGridFilterProps} from "../../models/interfaces/request/ILeavesGridFilterProps";


function LeavesGridFilter(props: ILeavesGridFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [showAdmins, setShowAdmins] = React.useState(props.filter.showAdmins);
    const [showType, setShowType] = React.useState(props.filter.showType);
    const [sortBy, setSortBy] = React.useState(props.filter.sortBy);

    const { t } = useTranslation();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        props.setFilter({
            ...props.filter, showAdmins: showAdmins, showType: showType, sortBy: sortBy
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function clearFilter() {
        props.setFilter({
            ...props.filter, showAdmins: DEFAULT_LEAVES_GRID_FILTER.showAdmins, showType: DEFAULT_LEAVES_GRID_FILTER.showType, sortBy: DEFAULT_LEAVES_GRID_FILTER.sortBy
        });
    }

    return (
        <React.Fragment>
            <Button startIcon={<FilterListIcon />} onClick={handleClickOpen} >
                <Typography variant="overline" >
                    {t(`DataGridToolBar.ManageFilters`)!}
                </Typography>
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='lg'
            >
                <Grid container
                      alignItems="center"
                      justifyContent="center">
                    <DialogTitle alignItems="center">{t(`ListAllFilters.Filter`)!}</DialogTitle>
                </Grid>
                <Box id='leavesGridFilterForm' className='searchForm' component="form" onSubmit={handleSubmit} noValidate>
                    <DialogContent>
                        <Grid className='filterBar' sx={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                                label={t('Show admins')}
                                labelPlacement='top'
                                control={<Switch
                                    color={'primary'}
                                    checked={showAdmins}
                                    onChange={(e) => setShowAdmins(e.target.checked)}
                                />}
                            />

                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">{t('Show types')}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="radio-buttons-group-label"
                                    value={showType}
                                    name="radio-buttons-group"
                                    onChange={(e) => setShowType(e.target.value)}
                                >
                                    <FormControlLabel value="ALL" control={<Radio />} label={t('All')} />
                                    <FormControlLabel value="LEAVE" control={<Radio />} label={t('Leave')} />
                                    <FormControlLabel value="HOME_OFFICE" control={<Radio />} label={t('Home office')} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction={'row'}>
                            <Grid item>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel id="sort-label">{t('sort')}</InputLabel>
                                    <Select
                                        labelId="sort-label"
                                        id="sort-select"
                                        value={sortBy}
                                        label={t('sort')}
                                        onChange={(event) => setSortBy(event.target.value)}
                                    >
                                        <MenuItem value={"ID"}>{t('Id')}</MenuItem>
                                        <MenuItem value={"NAME"}>{t('Name')}</MenuItem>
                                        <MenuItem value={"START_DATE"}>{t('Start date')}</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item marginLeft="auto" marginTop="auto" marginBottom="auto">
                                <Button
                                    type='submit'
                                    startIcon={<FilterAltIcon />}>
                                    {t('Filter')}
                                </Button>
                                <Button
                                    type='submit'
                                    onClick={clearFilter}>
                                    <CloseIcon />
                                    {t('Clear')}
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment >
    )
}

export default LeavesGridFilter;