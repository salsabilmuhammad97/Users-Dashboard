import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSearchQuery } from '../features/ui/uiSlice';

export default function SearchBar() {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector((state) => state.ui.searchQuery);

    return (
        <TextField
            label="Search by name"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            sx={{
                mb: 3, width: "30%", background: 'white',
                '& .MuiInputBase-input': {
                    fontSize: '13px',
                },
                '& .MuiInputLabel-root': {
                    fontSize: '13px',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#0000001f',
                    }
                },
                "@media (max-width: 999px)": {
                    width: '100%',
                    mb: "8px"
                }
            }}
            size='small'
        />
    );
}
