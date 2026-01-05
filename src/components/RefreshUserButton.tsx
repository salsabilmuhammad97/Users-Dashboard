import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/users/usersSlice';

export default function RefreshUsersButton() {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.users);

    return (
        <Button
            variant="contained"
            onClick={() => dispatch(fetchUsers())}
            disabled={loading}
            sx={{ mb: 2, height: "30px", color: "white", fontSize: "12px", textTransform: "capitalize" }}
            size='small'
        >
            {loading ? 'Refreshing...' : 'Refresh Users'}
        </Button>
    );
}
