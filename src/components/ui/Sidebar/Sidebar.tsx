import { ReactNode } from 'react';

import { SidebarWrap } from './Sidebar.styled';

export const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <SidebarWrap>{children}</SidebarWrap>;
};
