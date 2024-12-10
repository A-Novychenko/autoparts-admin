export type CatalogCategoryListProps = {
  categories: ICategory[];
  openCategories: number[];
  handleClick: (id: number) => void;
  isLoading: boolean;
  selectedCategory: ICategory | null;
};
