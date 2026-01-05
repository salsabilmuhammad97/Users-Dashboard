import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    saveProfileStart,
    saveProfileSuccess,
    saveProfileFailure,
    resetProfileFeedback
} from '../features/profile/profileSlice';
import { useEffect } from 'react';

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const { data, loading, error, success } = useAppSelector((state) => state.profile);

    const initialValues = { ...data };

    const validationSchema = Yup.object({
        name: Yup.string().required('Field is required'),
        phone: Yup.string().required('Field is required'),
        jobTitle: Yup.string().required('Field is required'),
        experience: Yup.number()
            .min(0, 'Field Must be greater than or equal 0')
            .required('Field is required'),
        address: Yup.string().required('Field is required'),
        workingHours: Yup.string().required('Field is required'),
    });

    const handleSubmit = (values: typeof initialValues) => {
        dispatch(saveProfileStart());

        setTimeout(() => {
            const successSimulation = true;
            if (successSimulation) {
                dispatch(saveProfileSuccess(values));
            } else {
                dispatch(saveProfileFailure('Failed to save profile'));
            }
        }, 1000);
    };

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => dispatch(resetProfileFeedback()), 2000);
            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);

    const inputSx = {
        '& .MuiInputBase-input': { fontSize: '13px', background: 'white' },
        '& .MuiInputLabel-root': { fontSize: '13px' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#0000001f' }
        }
    };

    const renderError = (name: string) => (
        <ErrorMessage name={name}>
            {(msg) => <span style={{ color: 'red', fontSize: '10px' }}>{msg}</span>}
        </ErrorMessage>
    );

    return (
        <Box
            maxWidth={500}
            mx="auto"
            mt={5}
            sx={{
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
                sx={{ color: "#7bb1a6", fontWeight: "600" }}
            >
                Edit Profile
            </Typography>

            {success && <Alert severity="success" sx={{ mb: 2 }}>Profile saved successfully!</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "15px" }}>
                            <Field
                                as={TextField}
                                label="Name"
                                name="name"
                                fullWidth
                                margin="normal"
                                size="small"
                                sx={inputSx}
                                helperText={renderError("name")}
                            />

                            <Field
                                as={TextField}
                                label="Phone"
                                name="phone"
                                fullWidth
                                margin="normal"
                                size="small"
                                sx={inputSx}
                                helperText={renderError("phone")}
                            />

                            <Field
                                as={TextField}
                                label="Job Title"
                                name="jobTitle"
                                fullWidth
                                margin="normal"
                                size="small"
                                sx={inputSx}
                                helperText={renderError("jobTitle")}
                            />

                            <Field
                                as={TextField}
                                label="Years of Experience"
                                name="experience"
                                type="number"
                                fullWidth
                                margin="normal"
                                size="small"
                                sx={inputSx}
                                helperText={renderError("experience")}
                            />

                            <Field
                                as={TextField}
                                label="Address"
                                name="address"
                                fullWidth
                                margin="normal"
                                size="small"
                                sx={inputSx}
                                helperText={renderError("address")}
                            />

                            <Field
                                as={TextField}
                                label="Working Hours"
                                name="workingHours"
                                fullWidth
                                margin="normal"
                                size="small"
                                sx={inputSx}
                                helperText={renderError("workingHours")}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 1, height: "30px", color: "white", fontSize: "12px", textTransform: "capitalize", display: "flex",
                                justifySelf: "flex-end"
                            }}
                            size='small'
                            disabled={loading || isSubmitting}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
