import styled from '@emotion/styled';

export const Field = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

export const FieldLabel = styled.p`
  width: 260px;
`;

export const FieldStatusYes = styled.span`
  color: #008000;
`;

export const FieldStatusNo = styled.span`
  color: #101340;
`;

export const FieldBtn = styled.button`
  display: block;

  padding: 3px 4px;
  border: 1px solid rgba(16, 19, 64, 0.5);
  width: 72px;

  color: #101340;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;

  background-color: transparent;
`;

export const FieldStatusAdd = styled.span`
  display: block;

  color: #008000;
`;

export const FieldStatusRemove = styled.span`
  display: block;

  color: #ff0000;
`;
