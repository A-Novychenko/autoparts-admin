type OrderProduct = {
  id: number;
  article: string;
  name: string;
  img: string;
  supplierPrice: number | null;
  price: number;
  price_promo: number | null;
  quantity: number;
  availability: string;
  availabilityLviv: string;
  availabilityOther?: string;
  _id: string;
  brand: string;
  comment: string;
};

type OrderItem = {
  _id: string;

  client: IClient;

  shipment: IShipment;

  comment: string;
  message: string;

  number: string;
  status: OrderStatus;

  products: OrderProduct[];
  totalAmount: number;
  totalAmountWithDiscount: number;
  totalDiscount: number;

  createdAt: string;
  updatedAt: string;

  declarationNumber: string[];
  isPaid: boolean;

  createdBy: string | null;
  updatedBy: string | null;
};

type OrderData = {
  _id: string;

  comment: string;
  message: string;

  number: string;
  status: OrderStatus;

  totalAmount: number;
  totalAmountWithDiscount: number;
  totalDiscount: number;

  createdAt: string;
  updatedAt: string;

  declarationNumber: string[];
  isPaid: boolean;

  createdBy: string | null;
  updatedBy: string | null;
};
