import { Box, Pagination as MuiPagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCurrentPage } from '../features/ui/uiSlice';

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.ui.currentPage);

    return (
        <Box mt={3} mb={7} display="flex" justifyContent="center">
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => dispatch(setCurrentPage(page))}
                color="primary"
            />
        </Box>
    );
}
