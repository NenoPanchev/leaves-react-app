import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogActions, DialogContent, FormControl, FormHelperText, Grid, Input, Typography } from "@mui/material";
import { GridRowsProp } from "@mui/x-data-grid";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import TypeService from "../../services/TypeService";
import ITypeEmployeePost from '../interfaces/type/ITypeEmploeePost';
import BasicDialogAlert from '../../components/Alert/BasicDialogAlert';


type RequestsGridProps = {
    onAdd: (row: GridRowsProp) => void;
}
const AddType: React.FC<RequestsGridProps> = (props): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [t, i18n] = useTranslation();
    const [type, setType] = React.useState<ITypeEmployeePost>(
        {
            typeName: "",
            daysLeave: "20",
        }
    );
    const [alertOpen, setAlertOpen] = React.useState(false);

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        if (!!!(type.typeName === "" || type.daysLeave === "")) {
            await TypeService.create(type)
                .then((response: any) => {
                    props.onAdd(response.data)
                    setOpen(false);
                })
                .catch((e: Error) => {
                    console.log(alertOpen);
                    setAlertOpen(true);
                });
        }

    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateAlertOpen = useCallback(
        (newValue: boolean): void => { setAlertOpen(newValue) }
        ,

        [setAlertOpen]

    );
    const basicDialogAlertProps = {
        message: t('typeAlert', { typeName: type.typeName }),
        open: alertOpen,
        onClose: updateAlertOpen
    }
    return (

        <React.Fragment>
            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                <Typography variant="overline" component="div">
                    {t(`DataGridToolBar.AddType`)!}
                </Typography>
            </Button>
            {alertOpen && <BasicDialogAlert {...basicDialogAlertProps} />}

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>

                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}>
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                        <FormControl>
                            <Input id="typeName"
                                error={type.typeName === ""}
                                aria-describedby="typeName-helper-text"
                                onChange={(event) => setType({ ...type, typeName: event.target.value })}
                            />
                            <FormHelperText id="typeName-helper-text">{type.typeName === "" ? 'Empty field!' : t(`LeaveTypes.TypeName`)!}</FormHelperText>
                            </FormControl>
                            <FormControl>
                            <Input id="daysLeave"
                                defaultValue={"20"}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                type="number"
                                aria-describedby="daysLeave-helper-text"
                                error={type.daysLeave === ""}
                                onChange={(event) => setType({ ...type, daysLeave: event.target.value })} />
                            <FormHelperText id="daysLeave-helper-text">{type.daysLeave === "" ? 'Empty field!' : t(`LeaveTypes.DaysLeave`)!}</FormHelperText>
                            </FormControl>
                        </FormControl>


                    </Box>

                </DialogContent>
                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">

                    <Grid >

                        <DialogActions>
                            <Button onClick={onSubmit} >{t(`Add`)!}</Button>
                        </DialogActions>
                    </Grid >
                    <Grid >
                        <DialogActions>
                            <Button onClick={handleClose} >{t(`Close`)!}</Button>
                        </DialogActions>

                    </Grid >
                </Grid >

            </Dialog>
        </React.Fragment>
    );
}
export default AddType;
