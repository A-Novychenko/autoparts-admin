import React, { useState, ReactNode, useRef, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';

import { Actions, Message, Popover } from './ConfirmAction.styled';

type ConfirmActionProps = {
  message: string;
  onConfirm: () => void | Promise<void>;
  children: ReactNode;
};

export const ConfirmAction: React.FC<ConfirmActionProps> = ({
  message,
  onConfirm,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const triggerRef = useRef<HTMLSpanElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupWidth = 240;
      const popupHeight = 120;

      // используем scrollY/scrollX, чтобы окно было прямо над кнопкой
      let top = rect.bottom + window.scrollY + 8;
      let left = rect.left + window.scrollX;

      // проверяем, не выходит ли за экран
      if (top + popupHeight > window.scrollY + window.innerHeight) {
        top = rect.top + window.scrollY - popupHeight - 8;
      }
      if (left + popupWidth > window.scrollX + window.innerWidth) {
        left = window.scrollX + window.innerWidth - popupWidth - 8;
      }

      setPos({ top, left });
    }
    setOpen(true);
  };

  const handleConfirm = async () => {
    setOpen(false);
    await onConfirm();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <span
        ref={triggerRef}
        onClick={handleClick}
        style={{ display: 'inline-block' }}
      >
        {children}
      </span>

      <AnimatePresence>
        {open && (
          <Popover
            // as={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ top: pos.top, left: pos.left }}
          >
            <Message>{message}</Message>
            <Actions>
              <Button
                ref={cancelBtnRef}
                variant="outlined"
                size="small"
                color="inherit"
                onClick={handleCancel}
              >
                Нет
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={handleConfirm}
              >
                Да
              </Button>
            </Actions>
          </Popover>
        )}
      </AnimatePresence>
    </>
  );
};
