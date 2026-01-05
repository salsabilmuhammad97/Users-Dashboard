import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { LoginFormValues } from '../../types';

const initialValues: LoginFormValues = { email: '', password: '' };

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Field is required'),
    password: Yup.string().required('Field is required'),
});

const inputStyles = {
    '& .MuiInputBase-input': { fontSize: '13px', background: 'white' },
    '& .MuiInputLabel-root': { fontSize: '13px' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#0000001f' },
    }
};

const ErrorText = ({ children }: { children?: React.ReactNode }) => (
    <span style={{ color: 'red', fontSize: '10px' }}>{children}</span>
);

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    const handleSubmit = (values: LoginFormValues) => {
        dispatch(loginStart());

        setTimeout(() => {
            const isAuthorized = values.email === 'q@quantum.io' && values.password === 'qTask123#';

            if (isAuthorized) {
                dispatch(loginSuccess({
                    email: values.email,
                    access: 'fake-token',
                    refresh: 'fake-refresh',
                }));
            } else {
                dispatch(loginFailure('Invalid email or password'));
            }
        }, 1000);
    };

    return (
        <Box
            mx="auto"
            mt={10}
            sx={{
                maxWidth: { xs: 270, sm: 400 },
                border: "1px solid #0000001f",
                borderRadius: "15px",
                padding: "32px",
                background: "white",
            }}
        >
            <Typography
                variant="h5"
                mb={3}
                textAlign="center"
                sx={{ color: "#7bb1a6", fontWeight: "600", textTransform: "uppercase" }}
            >
                Login
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        sx={inputStyles}
                        helperText={<ErrorMessage name="email" component={ErrorText} />}
                    />

                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        sx={inputStyles}
                        helperText={<ErrorMessage name="password" component={ErrorText} />}
                    />

                    {error && (
                        <Typography sx={{ color: 'red', fontSize: '10px' }} mt={1}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 2,
                            height: "40px",
                            color: "white",
                            fontSize: "14px",
                            textTransform: "capitalize",
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
            </Formik>
        </Box>
    );
}
