type CallbackItem = {
  _id: string;
  phone: string;
  comment: string;
  number: string;
  status: 'new' | 'inprogress' | 'done' | 'rejected';
  createdAt: string;
  updatedAt: string;
};
