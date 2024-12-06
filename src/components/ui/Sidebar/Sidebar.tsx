import staticData from '@/data/common.json';

import { List, ListItem, SidebarLink, SidebarWrap } from './Sidebar.styled';

export const Sidebar: React.FC = () => {
  const { productsNav } = staticData;

  return (
    <SidebarWrap>
      <List>
        {productsNav &&
          productsNav.map(({ name, link }, idx) => (
            <ListItem key={idx}>
              <SidebarLink
                to={link}
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? '#101340'
                    : 'rgba(16, 19, 64, 0.5)',
                  fontWeight: isActive ? '700' : '400',
                })}
              >
                {name}
              </SidebarLink>
            </ListItem>
          ))}
      </List>
    </SidebarWrap>
  );
};
