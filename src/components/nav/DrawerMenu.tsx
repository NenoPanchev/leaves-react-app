import { styled, Toolbar, List, Typography, Divider, IconButton, Grid } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AdminBar from './AdminBar';
import { useTranslation } from 'react-i18next';

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
    open: boolean
    toggleDrawer: () => void
}

function DrawerMenu(props: NavMenuProps) {
    const { t } = useTranslation();
    return (
        <Drawer className='menu-grid' variant="permanent" open={props.open}>
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
                    onClick={props.toggleDrawer}>
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

export default DrawerMenu;