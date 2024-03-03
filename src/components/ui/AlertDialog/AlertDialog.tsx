import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AlertDialogProps } from './types';

export const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  description,
  leftBtnLabel,
  rightBtnLabel,
  rightColorBtn,
  children,
  action,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRightBtn = () => {
    action();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {children}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        {description && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          {leftBtnLabel && (
            <Button onClick={handleClose}>{leftBtnLabel}</Button>
          )}

          <Button
            onClick={handleClickRightBtn}
            autoFocus
            style={{ color: rightColorBtn ? rightColorBtn : undefined }}
          >
            {rightBtnLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
