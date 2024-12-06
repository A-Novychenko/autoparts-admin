import { PageWrapProps } from './types';

import { Wrap } from './PageWrap.styled';

export const PageWrap: React.FC<PageWrapProps> = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};
