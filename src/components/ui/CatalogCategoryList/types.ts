export type CatalogCategoryListProps = {
  categories: ICategory[];
  openCategories: number[];
  handleClick: (id: number) => void;
};
