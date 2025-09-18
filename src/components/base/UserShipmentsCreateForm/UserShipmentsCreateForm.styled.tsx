import styled from '@emotion/styled';

export const CreateForm = styled.section`
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.05);
  width: 100%;
  max-width: 100%;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    font-size: 13px;
    color: #334155;
    user-select: none;
  }
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  width: 100%;
`;

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  font-size: 13px;
  color: #334155;
  font-weight: 600;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldControl: any = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  background: #fff;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }

  &:disabled {
    background: #f1f5f9;
    cursor: not-allowed;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
  align-items: center;

  > div {
    margin-right: auto;
    display: flex;
    align-items: center;
    gap: 8px;

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    label {
      font-size: 13px;
      color: #334155;
      user-select: none;
    }
  }
`;

export const PrimaryBtn = styled.button`
  background: linear-gradient(90deg, #101390, #101340);
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #1d4ed8, #1e40af);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryBtn = styled.button`
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #cbd5e1;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;
