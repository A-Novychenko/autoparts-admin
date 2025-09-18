import styled from '@emotion/styled';

/* breakpoints */
const bp = {
  mobile: '@media (max-width: 420px)', // iPhone XS/SE range
  tablet: '@media (max-width: 900px)',
};

export const PrimaryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(90deg, #101390, #101340);
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(90deg, #901010, #401010);
  color: #ffffff;
  border: 1px solid #e6eef8;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
`;

export const ShipmentCard = styled.li`
  background: #fff;
  border: 1px solid #e6eef8;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.03);
  min-height: 120px;
`;

export const CardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
`;

export const CardLabel = styled.div`
  font-size: 13px;
  color: #475569;
  font-weight: 600;
`;

export const CardValue = styled.div`
  font-size: 14px;
  color: #0f172a;
  min-width: 120px;
  min-width: 240px;
  text-align: right;

  ${bp.mobile} {
    text-align: left;
    width: 100%;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  justify-self: flex-end;
  justify-content: space-between;
  margin-top: 6px;
  flex-wrap: wrap;
`;

export const InlineInput = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e6eef8;
  font-size: 14px;
  width: 100%;
  max-width: 220px;

  &:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
    border-color: #3b82f6;
  }
`;

export const SmallSelect = styled.select`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e6eef8;
  font-size: 14px;
  background: #fff;
`;
