import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, FormControl, FormHelperText, Grid, Input, Paper, Slider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
type AddFilterProps = {
    buttonName: string,
    nameOfField: string,
    operation: string,
    initialStart: string,
    initialEnd: string,
    onChange: (newValue: string) => void;
    onChangeSlider: (startRange: string, endRange: string) => void;
}
function valuetext(value: number) {
    return `${value}°C`;
}
const minDistance = 0;
const MyAddFilterDays: React.FC<AddFilterProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [t, i18n] = useTranslation();
    let valueOneAdd = '1'
    const [value, setValue] = React.useState<number[]>(
        [Number.isNaN(parseInt(props.initialStart)) ? 20 : parseInt(props.initialStart), Number.isNaN(parseInt(props.initialEnd)) ? 40 : parseInt(props.initialEnd)]
    );





    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue as number[]);
        }
    };

    const handleChangeInput = (newValue: number | number[], activeInput: number) => {

        if (!Array.isArray(newValue)) {
            return;
        }

        if (Number.isNaN(newValue[0])) {
            newValue[0] = 0;
        }
        if (Number.isNaN(newValue[1])) {
            newValue[1] = 0;
        }
        if (newValue[1] > 100) {
            newValue[1] = 100;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeInput === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue as number[]);
        }

        console.log(newValue[0])
    };


    const onSubmit = async (e: { preventDefault: () => void; }) => {



        if (props.operation === "EQUAL") {
            if (valueOneAdd !== "" && !valueOneAdd.includes("e")) {
                props.onChange(valueOneAdd);
            }

        }
        else if (props.operation === "RANGE") {
            // if(value[0]<1||Number.isNaN(value[0]))
            // {
            //     props.onChangeSlider("1", value[1].toString())
            // }else if(value[0]>90)
            // {
            //     props.onChangeSlider("90", value[1].toString())
            // }
            props.onChangeSlider(value[0].toString(), value[1].toString())
        }
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function renderDaysComponents() {
        if (props.operation === "EQUAL") {
            return (<Box
                noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                }}>

                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <Input id="my-input" type="number" defaultValue={valueOneAdd} aria-describedby="my-helper-text" onChange={(event) => valueOneAdd = event.target.value} />
                    <FormHelperText id="my-helper-text">{props.nameOfField}</FormHelperText>
                </FormControl>

            </Box>);
        }
        else if (props.operation === "RANGE") {
            return (
                <Grid container width="100%" height="10vh">
                    <Slider sx={{ marginTop: "5%" }}
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                    />
                    <Grid container justifyContent="center">
                        <Paper sx={{ backgroundColor: grey[300] }} >
                            <Grid item width="5vh">
                                <FormControl >
                                    <Input
                                        id="my-input-Start"
                                        type="number"
                                        value={value[0].toString()}
                                        // inputProps={{min:"1",max:"90"}}
                                        onChange={(event) => handleChangeInput([parseInt(event.target.value), value[1]], 0)} />
                                </FormControl>
                                {/* <Typography variant="h6" width="10%">{value[0]}</Typography> */}
                            </Grid>
                        </Paper>
                        <Grid item ml="2%" mr="2%">
                            <Typography variant="h6" >-</Typography>
                        </Grid>
                        <Paper sx={{ backgroundColor: grey[300] }} >
                            <Grid item width="5vh">
                                <FormControl >
                                    <Input
                                        id="my-input-End"
                                        type="number"
                                        value={value[1].toString()}
                                        // inputProps={{min:"10",max:"100"}}
                                        onChange={(event) => handleChangeInput([value[0], parseInt(event.target.value)], 1)} />
                                    {/* <FormHelperText id="my-helper-text">{}</FormHelperText> */}
                                </FormControl>
                                {/* <Typography variant="h6" width="10%" > {value[1]}</Typography> */}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            );
        }

    }

    return (
        <React.Fragment>
            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                {props.buttonName}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth='xs'
            >
                <DialogContent>

                    {renderDaysComponents()}

                </DialogContent>
                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid >
                        <DialogActions>
                            <Button onClick={onSubmit} >{t('Add')}</Button>
                        </DialogActions>
                    </Grid >
                    <Grid >
                        <DialogActions>
                            <Button onClick={handleClose} >{t('Close')}</Button>
                        </DialogActions>

                    </Grid >
                </Grid >

            </Dialog>
        </React.Fragment>
    );
}
export default MyAddFilterDays;