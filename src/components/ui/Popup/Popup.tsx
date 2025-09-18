import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

type DeclarationNumberModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  children: React.ReactNode;
};

export const Popup: React.FC<DeclarationNumberModalProps> = ({
  open,
  onClose,
  onSave,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Введите номер ТТН
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Отмена
        </Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
