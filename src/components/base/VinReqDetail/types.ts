export type VinReqDetailProps = {
  item: VinReqDetailItem;
};

export type VinReqDetailItem = {
  _id: string;
  number: string;
  status: 'new' | 'in-progress' | 'done' | 'rejected';
  phone: string;
  vinCode: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
  fuel: string;
  comment: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};
