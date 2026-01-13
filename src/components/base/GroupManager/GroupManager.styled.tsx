import styled from '@emotion/styled';

export const CardContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;

  padding: 0 24px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #f0f0f0;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;
  padding-left: 0px;
  padding-right: 12px;
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 8px;
  padding: 8px;
`;

export const DateBadge = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  width: 176px;
  font-size: 10px;
  color: #2b2b2b;
  text-transform: uppercase;
`;
