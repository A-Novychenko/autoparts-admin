import { useState } from 'react';

import Button from '@mui/material/Button';
import { Popover } from '@mui/material';

import staticData from '@/data/common.json';

export const PricePromoPopover = ({
  price_client,
  handleSubmit = () => {},
}: {
  price_client: number;
  handleSubmit: (price: number) => void;
}) => {
  const { cancelBtn, saveBtn } = staticData.catalogCard;
  const { promoBtnLabels } = staticData.productCard.price;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [inputPrice, setInputPrice] = useState<number>(price_client);

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    setAnchorEl(null);
    handleSubmit(inputPrice);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <button
        aria-describedby={id}
        onClick={handleClickOpen}
        style={{
          backgroundColor: 'transparent',
          color: '#101340',
          padding: '2px 4px',
          border: '1px solid#101340',
          fontSize: '12px',
          fontWeight: '700',
        }}
        type="button"
      >
        {promoBtnLabels.add}
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <div>
          <div style={{ width: '100%', height: '100%', padding: '12px' }}>
            <input
              type="number"
              value={inputPrice}
              onChange={e => setInputPrice(Number(e.target.value))}
              min="0"
              style={{ width: '146px' }}
            />
          </div>

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
