import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f6f6f6;
  /* box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1); */
  margin-bottom: 12px;
`;

export const ImgBox = styled.div`
  height: 150px;
  flex-shrink: 0;
  padding: 8px;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const TextContentWrap = styled.div`
  flex-grow: 1;
`;

export const AddBtn = styled.button`
  margin-right: 24px;
  height: 40px;
`;
