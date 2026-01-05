import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Button,
} from '@mui/material';
import type { User } from '../types';

interface UsersTableProps {
    users: User[];
    onViewDetails: (user: User) => void;
}

export default function UsersTable({ users, onViewDetails }: UsersTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>Full Name</TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>City</TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>Country</TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell sx={{ fontSize: "12px" }}>{user.name}</TableCell>
                            <TableCell sx={{ fontSize: "12px" }}>{user.email}</TableCell>
                            <TableCell sx={{ fontSize: "12px" }}>{user.city}</TableCell>
                            <TableCell sx={{ fontSize: "12px" }}>{user.country}</TableCell>
                            <TableCell sx={{ fontSize: "12px" }}>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => onViewDetails(user)}
                                    sx={{ textTransform: "capitalize", fontWeight: "600" }}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
