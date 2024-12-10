import { ReactNode } from 'react';

export type CatalogCategoryBtnProps = {
  id: number;
  name: string;
  handleClick: (id: number) => void;
  children: ReactNode;
  selectedCategory: ICategory | null;
};
