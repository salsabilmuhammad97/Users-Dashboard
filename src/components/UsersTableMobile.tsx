import {
    Button,
    Box,
    Card,
    Typography,
} from '@mui/material';
import type { User } from '../types';

interface UsersTableProps {
    users: User[];
    onViewDetails: (user: User) => void;
}

export default function UsersTableMobile({ users, onViewDetails }: UsersTableProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {users.map(user => (
                <Card key={user.id} sx={{ p: 2, border: '1px solid #ddd' }}>
                    <Typography sx={{ fontSize: '12px' }} variant="body2"><strong>Name:</strong> {user.name}</Typography>
                    <Typography sx={{ fontSize: '12px' }} variant="body2"><strong>Email:</strong> {user.email}</Typography>
                    <Typography sx={{ fontSize: '12px' }} variant="body2"><strong>City:</strong> {user.city}</Typography>
                    <Typography sx={{ fontSize: '12px' }} variant="body2"><strong>Country:</strong> {user.country}</Typography>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => onViewDetails(user)}
                        sx={{ textTransform: "capitalize", fontWeight: "600", display: "flex", justifySelf: "flex-end", fontSize: "12px" }}
                    >
                        View
                    </Button>
                </Card>
            ))}
        </Box>
    );
}
