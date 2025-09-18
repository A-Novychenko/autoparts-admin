import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { PrimaryBtn } from './UserShipmentsCreateForm.styled';

export const UserShipmentsCreateFormWrap: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        background: '#fff',
      }}
    >
      <PrimaryBtn
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          display: 'block',
          fontWeight: 500,
          borderRadius: '12px',
          padding: '10px 20px',
          margin: '0 auto',
        }}
      >
        {isOpen ? 'Скрыть форму' : 'Создать доставку'}
      </PrimaryBtn>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="shipment-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '16px',
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
