import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const Popover = styled(motion.div)`
  position: absolute;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  width: 240px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1500;
`;

export const Message = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  color: #374151;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
