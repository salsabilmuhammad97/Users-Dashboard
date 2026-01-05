import { Box, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const MOBILE_BREAKPOINT = '@media (max-width: 999px)';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <HomeIcon sx={{ fontSize: 20 }} /> },
        { label: 'Profile', path: '/profile', icon: <ManageAccountsIcon sx={{ fontSize: 20 }} /> },
    ];

    const activeStyle = {
        bgcolor: '#f0f7ff',
        color: 'primary.main',
        borderRadius: '8px',
        '& .MuiSvgIcon-root, & .MuiListItemText-primary': { color: 'primary.main' },
        '&:hover': { bgcolor: '#e0efff' },
    };

    const commonButtonStyles = {
        display: 'flex',
        columnGap: '10px',
        alignItems: 'center',
        transition: 'all 0.2s',
    };

    return (
        <Box sx={{ position: 'relative', zIndex: 100, width: 200, [MOBILE_BREAKPOINT]: { width: 0 } }}>
            <Box
                sx={{
                    position: 'fixed',
                    bgcolor: 'white',
                    height: '100vh',
                    width: 'inherit',
                    p: 2,
                    color: '#000000ad',
                    borderRight: '1px solid #0000001f',
                    [MOBILE_BREAKPOINT]: {
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        p: 1,
                        borderTop: '1px solid #0000001f',
                        borderRight: 'none',
                    },
                }}
            >
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 1,
                        [MOBILE_BREAKPOINT]: { flexDirection: 'row' },
                    }}
                >
                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                selected={isActive(item.path)}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    ...commonButtonStyles,
                                    ...(isActive(item.path) ? activeStyle : {}),
                                }}
                            >
                                {item.icon}
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: '13px', fontWeight: '600' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {/* Logout */}
                    <ListItem disablePadding sx={{ [MOBILE_BREAKPOINT]: { width: 'auto' } }}>
                        <ListItemButton onClick={handleLogout} sx={commonButtonStyles}>
                            <ExitToAppIcon sx={{ fontSize: 20 }} />
                            <ListItemText
                                primary="Logout"
                                primaryTypographyProps={{ fontSize: '13px', fontWeight: '600' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}
