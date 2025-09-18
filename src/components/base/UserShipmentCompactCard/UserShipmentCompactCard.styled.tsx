import styled from '@emotion/styled';

export const ShipmentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  justify-content: space-between;

  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 1.4;
  padding: 4px 0;
`;

export const CardLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

export const CardValue = styled.span`
  color: #111827;
  font-weight: 400;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
`;

export const DefaultBtn = styled.button<{ active?: boolean }>`
  margin-top: 10px;
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid ${({ active }) => (active ? '#fbbf24' : '#d1d5db')};
  background: ${({ active }) => (active ? '#fff7ed' : '#f9fafb')};
  color: ${({ active }) => (active ? '#b45309' : '#374151')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    /* background: ${({ active }) => (active ? '#fffbeb' : '#f3f4f6')}; */
    border: 1px solid #fbbf24;
    background: #fff7ed;
    color: #b45309;
  }

  svg {
    color: ${({ active }) => (active ? '#f59e0b' : '#9ca3af')};
  }
`;
