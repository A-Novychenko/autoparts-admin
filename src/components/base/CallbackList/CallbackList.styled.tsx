import styled from '@emotion/styled';

export const Container = styled.section`
  width: 100%;
  padding: 32px 16px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const gridTemplate = `
  80px 160px 100px 180px 120px 280px 1fr 160px
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
    margin-bottom: 8px;

    position: sticky;
    top: 120px;
    z-index: 10;
  }
`;
