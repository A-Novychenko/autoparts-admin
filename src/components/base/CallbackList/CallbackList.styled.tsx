import styled from '@emotion/styled';

const gridTemplate = `
  80px 160px 100px 180px 160px 280px 1fr 160px
`;

export const Container = styled.section`
  width: 100%;
  padding: 0px 16px 32px;
  overflow: hidden;
  height: calc(100vh - 128px);
`;

export const Header = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: ${gridTemplate};
    gap: 8px;
    align-items: center;
    padding: 12px 16px;
    font-weight: 600;
    font-size: 14px;
    background: #f9fafb;
    border-radius: 10px;
    margin-bottom: 5px;
    width: 100%;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  height: calc(100vh - 173px);
  padding: 0 0 32px;
`;
