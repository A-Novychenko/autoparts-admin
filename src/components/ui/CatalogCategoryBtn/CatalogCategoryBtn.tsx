import { CatalogCategoryBtnProps } from './types';

import { Button } from './CatalogCategoryBtn.styled';

export const CatalogCategoryBtn: React.FC<CatalogCategoryBtnProps> = ({
  id,
  name,
  handleClick,
  children,
}) => {
  return (
    <Button
      type="button"
      onClick={() => {
        handleClick(id);
      }}
    >
      {children}
      <span>{id}</span>
      <span> {name}</span>
    </Button>
  );
};
