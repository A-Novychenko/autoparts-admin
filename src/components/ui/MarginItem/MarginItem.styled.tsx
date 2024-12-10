import styled from '@emotion/styled';

export const WrapMargin = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 18px;
`;

export const MarginForm = styled.form`
  color: #008011;
  font-weight: 600;
`;

export const MarginValueWrap = styled.div`
  position: relative;
`;

export const MarginValue = styled.input`
  width: 48px;
  border: none;
  padding-right: 20px;

  color: #008011;
  font-weight: 600;
`;

export const MarginPercentage = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const AlertText = styled.p`
  padding: 16px;
`;

export const AlertPercentage = styled.span`
  color: #008011;
`;
