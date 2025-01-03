import PaginationMui from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { PaginationProps } from './types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  setProducts,
}) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setProducts([]);
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2}>
      <PaginationMui
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
};
