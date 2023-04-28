import * as React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Card, Table, Button, Typography } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as userService from '../../services/userService';

import '../SingleItemView.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { IViewProps } from '../interfaces/common/IViewProps';


export default function LeavesReport(props: IViewProps) {

  const user = userService.useFetchOne(props.id);
  const currentUser = React.useContext(AuthContext);
  const names = new Set<string>();
  const { t } = useTranslation();
  user?.roles.forEach(role => {
    role.permissions.forEach(permission => {
      names.add(permission.name);
    })
  })

  let isCurrentUserThisUser = currentUser.user?.getEmail() === user?.email;
  return (
    <React.Fragment>
      
    </ React.Fragment>
  );
}