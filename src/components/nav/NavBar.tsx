import { IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Flag from "react-world-flags";
import AuthContext from "../../contexts/AuthContext";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface NavMenuProps {
    onDrawerClick: () => void
}
export interface NavBarRef {
    open: () => void;
   

}
function NavBar(props: NavMenuProps,ref:React.ForwardedRef<NavBarRef>) {
    const { user } = React.useContext(AuthContext);
    const [lang, setLang] = React.useState('en');
    let path = useLocation().pathname.replaceAll('/', '');
    const { t, i18n } = useTranslation();
    const navBarHeightRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(true);

    React.useImperativeHandle(ref, () => {
        return {
            open: openNav
        }
    }, [open])
    
    const openNav = () => {
      setOpen(!open);
    };
    
    const adjustPathToLocaleKey = (path: string): string => {
        path = path.charAt(0).toUpperCase() + path.slice(1);
        switch (path) {
            case '':
                path = 'Dashboard'
                break;
            case 'Requests':
                path = 'Request'
                break;
            case 'Types':
                path = 'LeaveType'
                break;
            default:
                break;
        }
        return path;
    }

    path = adjustPathToLocaleKey(path);

    const onClickSetLanguageEN = (e: any) => {
        i18n.changeLanguage('en'); //change the language  
        setLang('en');
    }
    const onClickSetLanguageBG = (e: any) => {
        i18n.changeLanguage('bg'); //change the language  
        setLang('bg');
    }

    return (
        <AppBar ref={navBarHeightRef} className="header-grid" position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.onDrawerClick}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {t(path)}
                </Typography>
                <Typography component={'h6'} variant='h6'>{user?.getEmail()}</Typography>
                {lang === 'en'
                    ? <IconButton onClick={onClickSetLanguageBG}>
                        <Flag code='BG' height='16' />
                    </IconButton>
                    : <IconButton onClick={onClickSetLanguageEN}>
                        <Flag code='GB' height='16' />
                    </IconButton>
                }

            </Toolbar>
        </AppBar>
    )
}

export default React.forwardRef(NavBar);