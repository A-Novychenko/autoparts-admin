import styled from '@emotion/styled';

const gridTemplate = `
  80px 160px 100px 180px 160px 280px 1fr 160px
`;

export const Card = styled.article`
  display: grid;
  grid-template-columns: ${gridTemplate};
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-size: 14px;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const GridItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusBadge = styled.span`
  background: #22c55e;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 6px;
`;

export const Select = styled.select`
  margin-top: 6px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const TextAreaStyled = styled.textarea`
  padding: 12px 14px;
  border: 1px solid #ccd1d9;
  border-radius: 8px;
  resize: none;
  font-size: 15px;
`;

export const SaveBtn = styled.button`
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;
