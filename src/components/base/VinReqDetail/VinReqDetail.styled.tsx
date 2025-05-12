import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 40px;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c3e50;
`;

export const CreatedDate = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #007bff;
  white-space: nowrap;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: #34495e;
`;

export const Value = styled.div`
  padding: 12px 16px;
  background: #f4f6f8;
  border-radius: 8px;
  border: 1px solid #dcdfe3;
  color: #2d3436;
  min-height: 48px;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
`;

export const SelectStyled = styled.select`
  padding: 12px 14px;
  border: 1px solid #ccd1d9;
  border-radius: 8px;
  background: #fff;
  font-size: 15px;
`;

export const TextAreaStyled = styled.textarea`
  padding: 12px 14px;
  border: 1px solid #ccd1d9;
  border-radius: 8px;
  resize: vertical;
  font-size: 15px;
`;

export const SaveButton = styled.button`
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
