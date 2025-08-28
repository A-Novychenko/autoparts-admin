import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const gridTemplate = `
  140px 150px 150px 200px 1fr 160px
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
  padding: 0 0 32px;
  overflow-y: scroll;
  height: calc(100vh - 173px);
`;

export const Card = styled.article`
  display: grid;
  grid-template-columns: ${gridTemplate};
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-size: 14px;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const GridItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusBadge = styled.span`
  background: #22c55e;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 6px;
`;

export const OpenBtn = styled(Link)`
  background: #2563eb;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  justify-self: start;

  &:hover {
    background: #1d4ed8;
  }
`;
