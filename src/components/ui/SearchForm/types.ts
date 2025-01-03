/* eslint-disable @typescript-eslint/no-explicit-any */
export type searchFormProps = {
  keyData: string;
  setItems: React.Dispatch<React.SetStateAction<IProductASG[]>>;
  fetchData: (query: string) => Promise<any>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
  loadingSearchProducts: boolean;
  setLoadingSearchProducts: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorSearchProducts: React.Dispatch<React.SetStateAction<string | null>>;
};
