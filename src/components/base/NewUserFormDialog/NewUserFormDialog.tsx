import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { useAppDispatch } from '@/redux/hooks';
import { addUser } from '@/redux/auth/authOperations';

import staticData from '@/data/common.json';

export const NewUserFormDialog = () => {
  const { newUserLabel, newUserSubmitBtn, newUserCancelBtn, fields } =
    staticData.userPage;

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('manager');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ mt: 5, mb: 5 }}
      >
        {newUserLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            const data = {
              name: formJson.name,
              login: formJson.login,
              password: formJson.password,
              role: formJson.role,
            };

            console.log('data', data);

            dispatch(addUser(data));

            handleClose();
          },
        }}
      >
        <DialogTitle> {newUserLabel}</DialogTitle>

        <DialogContent>
          {fields &&
            fields.map(({ id, label, values }, idx) => {
              return id !== 'role' ? (
                <TextField
                  key={`${idx}${values}`}
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name={id}
                  label={label}
                  type="text"
                  fullWidth
                  variant="standard"
                />
              ) : (
                <FormControl
                  key={`${idx}${values}`}
                  fullWidth
                  style={{ marginTop: 20 }}
                >
                  <InputLabel required id="demo-simple-select-label">
                    {label}
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id={id}
                    name={id}
                    value={role}
                    label={label}
                    onChange={handleChangeRole}
                  >
                    {values &&
                      values.map((el, idx) => (
                        <MenuItem key={idx} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              );
            })}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{newUserCancelBtn}</Button>

          <Button type="submit">{newUserSubmitBtn}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
