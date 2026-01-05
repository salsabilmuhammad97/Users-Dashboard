import { Box } from '@mui/material';
import Sidebar from '../Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <Box display="flex">
            <Sidebar />
            <Box component="main" flex={1} p={3}>
                {children}
            </Box>
        </Box>
    );
}
