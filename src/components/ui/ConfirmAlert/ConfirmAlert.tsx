import { ReactNode, useState } from 'react';

import Button from '@mui/material/Button';
import { Popover } from '@mui/material';

import staticData from '@/data/common.json';

export const ConfirmAlert = ({
  children,
  handleSubmit = () => {},
  disabled,
}: {
  children: ReactNode;
  handleSubmit?: () => void;
  disabled: boolean;
}) => {
  const { changeBtnLabel, cancelBtn, saveBtn } = staticData.catalogCard;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    setAnchorEl(null);
    handleSubmit();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClickOpen}
        disabled={!disabled}
        sx={{
          height: '20px',
          fontSize: '0.6rem',
          padding: '0 4px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#101340',
        }}
      >
        {changeBtnLabel}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <div>
          {children}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 16px 16px',
              width: 172,
              marginLeft: 'auto',
            }}
          >
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClose}
              sx={{
                height: '20px',
                fontSize: '0.6rem',
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                color: '#f00',
                ':hover': {
                  backgroundColor: '#f00',
                  color: '#ffffff',
                },
                ':focus': {
                  backgroundColor: '#f00',
                  color: '#ffffff',
                },
              }}
            >
              {cancelBtn}
            </Button>

            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleSave}
              sx={{
                height: '20px',
                fontSize: '0.6rem',
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#101340',
                ':hover': {
                  backgroundColor: '#1d6d1d',
                },
                ':focus': {
                  backgroundColor: '#1d6d1d',
                },
              }}
            >
              {saveBtn}
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};
