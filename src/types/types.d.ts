interface IProductASG {
  _id: string;
  id: number;

  category: string;
  category_id: number;

  brand: string;
  article: string;
  tecdoc_article: string;

  name: string;
  description: string;
  img: string[];

  count_warehouse_3: string;
  count_warehouse_4: string;
  price_supplier: number;
  price_client: number;
  price_promo: number;
  banner: boolean;
  sale: boolean;
}

interface ICategory {
  createdAt: string;
  id: number;
  img: string;
  name: string;
  margin: number;
  parent_id: number;
  updatedAt: string;
  _id: string;
  childrenCategories?: ICategory[];
}
