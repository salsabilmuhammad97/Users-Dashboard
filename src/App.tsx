import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/Login/Login';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import MainLayout from './components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { restoreAuth } from './features/auth/authSlice';
import { createTheme, ThemeProvider } from '@mui/material';

export default function AppRoutes() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(restoreAuth())
    }, [])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#7bb1a6',
                light: '#97c2b9ff',
                dark: '#72a79cff',
                contrastText: '#ffffff',
            },
            text: {
                primary: "#0000009a",
                secondary: "#0000008a"
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated ? (
                                <MainLayout>
                                    <Dashboard />
                                </MainLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            isAuthenticated ? (
                                <MainLayout>
                                    <ProfilePage />
                                </MainLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
