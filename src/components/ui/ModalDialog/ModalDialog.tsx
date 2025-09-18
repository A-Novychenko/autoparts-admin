import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  DialogProps,
} from '@mui/material';

type ModalDialogProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  /** Ширина окна, поддерживаются стандартные значения MUI */
  maxWidth?: DialogProps['maxWidth'];
  /** Растягивать ли окно на всю ширину maxWidth */
  fullWidth?: boolean;
};

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Сохранить',
  cancelText = 'Отмена',
  maxWidth = 'sm',
  fullWidth = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);
  return (
    <Dialog
      ref={dialogRef}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-dialog-title"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      disableEnforceFocus
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
