import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

type ModalDialogProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Сохранить',
  cancelText = 'Отмена',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      {title && <DialogTitle id="modal-dialog-title">{title}</DialogTitle>}

      <DialogContent dividers>
        <Typography component="div">{children}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" variant="outlined">
          {cancelText}
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} color="primary" variant="contained">
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
