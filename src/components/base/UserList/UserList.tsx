import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, CircularProgress, Switch } from '@mui/material';

import { useAppDispatch } from '@/redux/hooks';
import { changeStatus, removeUser } from '@/redux/auth/authOperations';
import { useAuth } from '@/hooks';

import staticData from '@/data/common.json';

import { Column, ColumnData, UserListProps } from './types';
import { AlertDialog } from '@/components/ui';

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentItem, setCurrentItem] = useState('');

  const dispatch = useAppDispatch();

  const { isLoading } = useAuth();

  const data: ColumnData[] = staticData.userItem;

  const columns: Column[] = data.map(item => ({
    id: item.id as Column['id'],
    label: item.label,
  }));

  const rows = users
    ? users.map(user => ({ ...user, password: '*******', editor: 'editor' }))
    : [];

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const status = event.target.checked ? 'enabled' : 'disabled';
    setCurrentItem(id);
    await dispatch(changeStatus({ id, status }));
    setCurrentItem('');
  };

  const handleDelete = (id: string) => {
    dispatch(removeUser(id));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ minHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} style={{ minWidth: 170 }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    style={{
                      backgroundColor:
                        row.role === 'admin'
                          ? 'rgba(0, 179, 255, 0.05)'
                          : 'rgba(0, 255, 47, 0.05)',
                    }}
                  >
                    {columns.map(column => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id}>
                          {(column.id === 'name' ||
                            column.id === 'login' ||
                            column.id === 'role' ||
                            column.id === 'password') && <>{value}</>}

                          {column.id === 'status' &&
                            (isLoading && currentItem === row._id ? (
                              <Box sx={{ display: 'flex' }}>
                                <CircularProgress size={38} />
                              </Box>
                            ) : (
                              <Switch
                                checked={value === 'enabled'}
                                onChange={e => handleChange(e, row._id)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            ))}

                          {column.id === 'editor' && (
                            <AlertDialog
                              title="Удалить пользователя?"
                              description="Пользователь будет полностью удален из базы данных. После удаления восстановить не возможно"
                              leftBtnLabel="Отменить"
                              rightBtnLabel="Удалить"
                              rightColorBtn="#f70b0b"
                              action={() => {
                                handleDelete(row._id);
                              }}
                            >
                              <DeleteIcon />
                            </AlertDialog>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
