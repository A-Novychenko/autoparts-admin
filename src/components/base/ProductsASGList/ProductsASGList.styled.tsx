import styled from '@emotion/styled';

export const Wrap = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  height: calc(100vh - 353px);
`;

export const List = styled.ul`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  row-gap: 12px;
  overflow: auto;
  padding-right: 14px;
  height: calc(100vh - 353px);

  padding-bottom: 12px;
`;

export const ErrorText = styled.p`
  color: #f00;
`;

export const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 69px;
`;

export const EmptyList = styled.div`
  height: calc(100vh - 353px);
`;
