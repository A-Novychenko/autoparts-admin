import { ReactNode } from 'react';

import { SidebarWrap } from './Sidebar.styled';

export const Sidebar: React.FC<{
  children: ReactNode;
  paddingBottom?: number;
  padding?: number;
}> = ({ children, padding, paddingBottom }) => {
  return (
    <SidebarWrap padding={padding} paddingBottom={paddingBottom}>
      {children}
    </SidebarWrap>
  );
};
