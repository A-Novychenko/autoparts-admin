export type CatalogCategoryCardProps = {
  category: ICategory | null;
  isLoading: boolean;
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
};
