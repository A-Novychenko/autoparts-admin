export type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setProducts: React.Dispatch<React.SetStateAction<IProductASG[]>>;
};
