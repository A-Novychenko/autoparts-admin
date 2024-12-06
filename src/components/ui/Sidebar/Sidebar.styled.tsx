import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const SidebarWrap = styled.aside`
  width: 280px;
  height: calc(100vh - 64px);
  padding: 40px;

  /* border-right: 1px solid #101340; */
  border-right: 1px solid #b9b8b8;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

export const ListItem = styled.li`
  display: flex;
`;

export const SidebarLink = styled(NavLink)`
  width: 100%;
  padding: 8px;

  color: white;
  font-weight: 700;

  border-radius: 4px;
  background-color: #101340;
`;
