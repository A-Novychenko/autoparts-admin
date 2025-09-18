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

interface IClient {
  _id: string;
  name: string;
  phone: string;
  email: string;
  login: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  clientCode: string;
  company: string | null;
  discountRate: number;
  totalSpent: number;
}

type OrderStatus =
  | 'new'
  | 'in-progress'
  | 'awaiting-payment'
  | 'processed'
  | 'sent'
  | 'reserve'
  | 'done'
  | 'rejected';
type DeliveryMethod = 'pickup' | 'post';
type PaymentMethod = 'card' | 'cash' | 'prepayment' | 'cod';
type DeliveryPaymentMethod = 'client' | 'shop' | 'clientBank' | 'shopBank';

interface IShipment {
  _id: string;
  client: string;
  name: string;
  phone: string;
  delivery: DeliveryMethod;
  deliveryCity: string;
  postOffice: string;
  payment: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  company: string;
  deliveryPayment: DeliveryPaymentMethod;
}
