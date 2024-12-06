import { PageContainerProps } from './types';

import { PageContainerWrap } from './PageContainer.styled';

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <PageContainerWrap>{children}</PageContainerWrap>;
};
