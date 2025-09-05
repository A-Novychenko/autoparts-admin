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
  brand: string;
};

type OrderItem = {
  _id: string;

  client: IClient;

  shipment: IShipment;

  comment: string;
  message: string;

  number: string;
  status:
    | 'new'
    | 'in-progress'
    | 'awaiting-payment'
    | 'processed'
    | 'sent'
    | 'reserve'
    | 'done'
    | 'rejected';

  delivery: string;
  deliveryCity: string;
  postOffice: string;
  payment: string;

  products: OrderProduct[];
  totalAmount: number;
  totalAmountWithDiscount: number;
  totalDiscount: number;

  createdAt: string;
  updatedAt: string;
};
