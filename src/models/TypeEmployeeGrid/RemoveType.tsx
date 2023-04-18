import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GridActionsCellItem } from '@mui/x-data-grid';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import TypeService from '../../services/TypeService';
import ITypeEmploeeGet from '../interfaces/type/ITypeEmploeeGet';
type TypeRemoveProps = {
  typeEmployee: ITypeEmploeeGet
  onDelete: (rowId: number) => void;
}
const RemoveType: React.FC<TypeRemoveProps> = (props): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [t, i18n] = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    TypeService.remove(props.typeEmployee.id)
      .then((response: any) => {
        props.onDelete(props.typeEmployee.id!)
        console.log(props.typeEmployee.id);
      }
      )
      .catch((e: Error) => {
        console.log(e);
      });
    setOpen(false);
  };
  function checkForNullArray(array: any[]) {
    if (array === null) {
      return 0;
    } else {
      return array.length;
    }
  }

  return (
    <div>
      <GridActionsCellItem
        icon={<Tooltip title={t('delete')}><DeleteIcon /></Tooltip>}
        label="Delete"
        className="textPrimary"
        onClick={handleClickOpen}
        color="inherit"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('removeTypeMsg', { typeName: props.typeEmployee.typeName })}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            {t('alertMassageDeleteType', { employeeWithType: checkForNullArray(props.typeEmployee.employeeWithType) })}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button onClick={handleDelete} autoFocus>
            {t('delete')}
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RemoveType;