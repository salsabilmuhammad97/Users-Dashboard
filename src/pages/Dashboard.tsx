import { Box, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/users/usersSlice';

import SearchBar from '../components/SearchBar';
import UsersTable from '../components/UsersTable';
import UsersTableMobile from '../components/UsersTableMobile';
import Pagination from '../components/Pagination';
import UserModal from '../components/UserModal';
import RefreshUsersButton from '../components/RefreshUserButton';

import type { User } from '../types';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery('(max-width:999px)');

    const { users, loading, error } = useAppSelector((state) => state.users);
    const { searchQuery, currentPage, pageSize } = useAppSelector((state) => state.ui);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Box component="main" sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
                variant="h5"
                sx={{ color: "#7bb1a6", fontWeight: "600", mb: 3 }}
            >
                Dashboard
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    gap: 2
                }}
            >
                <SearchBar />
                <RefreshUsersButton />
            </Box>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                    <CircularProgress size={32} />
                </Box>
            )}

            {error && (
                <Typography color="error" textAlign="center" my={2}>
                    {error}
                </Typography>
            )}

            {!loading && !error && (
                <>
                    {isMobile ? (
                        <UsersTableMobile
                            users={paginatedUsers}
                            onViewDetails={setSelectedUser}
                        />
                    ) : (
                        <UsersTable
                            users={paginatedUsers}
                            onViewDetails={setSelectedUser}
                        />
                    )}

                    <Pagination totalPages={totalPages} />

                    <UserModal
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                    />
                </>
            )}
        </Box>
    );
}
