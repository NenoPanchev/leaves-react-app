import { styled, Toolbar, List, Typography, Divider, IconButton, Grid } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AdminBar from './AdminBar';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import React from 'react';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

interface NavMenuProps {
    onDrawerClick: () => void
}
export interface DrawerMenuRef {
    open: () => void;
}

function DrawerMenu(props: NavMenuProps , ref: React.ForwardedRef<DrawerMenuRef>) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(true);

    
    React.useImperativeHandle(ref, () => {
        return {
            open: openDrawer
        }
    }, [open])
    
    const openDrawer = () => {
      setOpen(!open);
    };
   
    return (
        <Drawer className='menu-grid' variant="permanent" open={open}>
            <Toolbar
                disableGutters={true}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <Typography component={'h6'} variant='h6' align='center' mx={'auto'}>{t('Leaves App')}</Typography>
                <IconButton sx={{ justifyContent: 'flex-end' }}
                    onClick={  props.onDrawerClick}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <AdminBar />
            </List>
        </Drawer>
    )
}

export default React.forwardRef(DrawerMenu);