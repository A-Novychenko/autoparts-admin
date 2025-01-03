export type ProductsASGListProps = {
  products: IProductASG[];
  setProducts: React.Dispatch<React.SetStateAction<IProductASG[]>>;
  hasData: boolean;
  loadingSearchProducts: boolean;
  errorSearchProducts: string | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};
