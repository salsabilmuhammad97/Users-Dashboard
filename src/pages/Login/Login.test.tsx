import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import LoginForm from './Login';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';

describe('LoginForm', () => {
    test('renders email, password inputs and login button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('shows validation errors on empty submit', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        const errorMessages = await screen.findAllByText(/Field is required/i);
        expect(errorMessages).toHaveLength(2);
    });


    test('shows error message on invalid credentials', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'wrong@quantum.io' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpass' },
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    test('successful login with correct credentials', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'q@quantum.io' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'qTask123#' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(localStorage.getItem('access')).toBe('fake-token');
            expect(store.getState().auth.access).toBe('fake-token');
        }, { timeout: 2000 });
    });

});
