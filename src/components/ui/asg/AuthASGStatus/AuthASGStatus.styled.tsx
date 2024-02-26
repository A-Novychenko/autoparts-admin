import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px;

  width: 100%;
  background: linear-gradient(to bottom right, #ec7c03, #f2ab00 90%);
`;

export const ImgWrap = styled.div`
  width: 220px;
  height: 55px;
`;

export const Img = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DataWrap = styled.div`
  display: flex;
  background-color: ${props => props.color};
  padding: 8px;
  border-radius: 8px;
`;
export const NameBox = styled.div`
  width: 150px;
`;
export const ContactBox = styled.div`
  width: 150px;
`;
export const NameText = styled.p`
  color: #000000;
`;
