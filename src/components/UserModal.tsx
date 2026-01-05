import { Modal, Box, Typography } from '@mui/material';
import type { User } from '../types';

interface UserModalProps {
    user: User | null;
    onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
    return (
        <Modal open={!!user} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 250,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    color: "#0000009a",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {user && (
                    <>
                        <img
                            src={user.picture}
                            alt={user.name}
                            style={{ width: 100, borderRadius: '50%', marginBottom: 16 }}
                        />
                        <Typography sx={{ fontWeight: "600", mb: 1 }} >{user.name}</Typography>
                        <Typography sx={{ fontSize: "12px", mt: 1, alignSelf: "self-start" }}>Email {user.email}</Typography>
                        <Typography sx={{ fontSize: "12px", mt: 1, alignSelf: "self-start" }}>Phone: {user.phone}</Typography>
                        <Typography sx={{ fontSize: "12px", mt: 1, alignSelf: "self-start" }}>Address: {user.address}</Typography>
                    </>
                )}
            </Box>
        </Modal>
    );
}
