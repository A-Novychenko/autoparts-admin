type OrderProduct = {
  id: number;
  article: string;
  name: string;
  img: string;
  price: number;
  price_promo: number | null;
  quantity: number;
  availability: string;
  _id: string;
};

type OrderItem = {
  _id: string;
  number: string;
  status: 'new' | 'in-progress' | 'done' | 'rejected';
  name: string;
  phone: string;
  email: string;
  comment: string;
  message: string;
  delivery: string;
  deliveryCity: string;
  postOffice: string;
  payment: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
};
