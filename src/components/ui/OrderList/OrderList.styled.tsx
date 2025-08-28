import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const gridTemplate = `
   50px 100px 160px 140px 80px 160px 60px 1fr 160px
`;
const gridTemplateBig = `
   60px 100px 180px 150px 200px 280px 60px 1fr 160px
`;

export const Container = styled.section`
  width: 100%;
  padding: 0px 16px;
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
  @media (min-width: 1260px) {
    grid-template-columns: ${gridTemplateBig};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 0 32px;
  overflow-y: scroll;
  height: calc(100vh - 173px);
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #222;
  margin-bottom: 24px;
`;

export const InlineItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const SubTitle = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

// export const Card = styled.article`
export const Card = styled(Link)`
  display: grid;
  grid-template-columns: ${gridTemplate};
  gap: 8px;
  align-items: center;
  padding: 8px 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-size: 14px;
  color: #101340;
  /* margin-bottom: 4px; */

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (min-width: 1260px) {
    grid-template-columns: ${gridTemplateBig};
  }
`;

export const GridItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const GridItemAddress = styled.div`
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;
export const OrderNumber = styled.span`
  display: inline-block;
  font-weight: 700;
`;

export const StatusBadge = styled.span`
  background: #22c55e;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 6px;
`;

// export const OpenBtn = styled(Link)`
export const OpenBtn = styled.span`
  /* background: #2563eb;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  justify-self: start; */
  display: flex;

  &:hover {
    background: #1d4ed8;
  }
`;
