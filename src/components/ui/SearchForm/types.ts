/* eslint-disable @typescript-eslint/no-explicit-any */
export type searchFormProps = {
  children: React.ReactNode;
  keyData: string;
  setItems: React.Dispatch<React.SetStateAction<IProductASG[]>>;
  hasData: boolean;
  fetchData: (query: string) => Promise<any>;
};
