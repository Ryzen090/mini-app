export type PaymentItem = {
  items: Item[];
};

export type Item = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Payments = {
  qrImage: string;
  description: string;
  status: IStatus;
};

type IStatus = {
  tran_id: string;
  orderId: string;
};
