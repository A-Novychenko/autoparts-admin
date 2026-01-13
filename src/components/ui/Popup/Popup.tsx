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
  onSave?: () => Promise<void>;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
};

export const Popup: React.FC<DeclarationNumberModalProps> = ({
  open,
  onClose,
  onSave,
  title = '',
  children,
  maxWidth = 'xs',
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {title}

        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {onSave && (
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Отмена
          </Button>
          <Button onClick={onSave} variant="contained" color="primary">
            Добавить
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
