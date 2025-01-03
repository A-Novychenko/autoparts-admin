import { CatalogCategoryBtnProps } from './types';

import { Button } from './CatalogCategoryBtn.styled';

export const CatalogCategoryBtn: React.FC<CatalogCategoryBtnProps> = ({
  id,
  name,
  handleClick,
  children,
  selectedCategory,
}) => {
  const selectedCategoryId = selectedCategory ? selectedCategory.id : null;
  const isSelected = selectedCategoryId === id;

  return (
    <Button
      style={{
        color: isSelected ? '#000' : '#101340',
        fontWeight: isSelected ? 700 : 400,
      }}
      type="button"
      onClick={() => {
        handleClick(id);
      }}
    >
      {children}

      <span> {name}</span>
    </Button>
  );
};
