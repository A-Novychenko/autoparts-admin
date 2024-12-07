interface IProductASG {
  article: string;
  brand: string;
  category: string;
  category_id: number;
  cid: string;
  count_warehouse_3: string;
  createdAt: string;
  description: string;
  id: number;
  img: string[];
  name: string;
  price: number;
  price_asg: number;
  tecdoc_article: string;
  updatedAt: string;
  _id: string;
}

interface ICategory {
  createdAt: string;
  id: number;
  img: string;
  name: string;
  parent_id: number;
  updatedAt: string;
  _id: string;
  childrenCategories?: ICategory[];
}
