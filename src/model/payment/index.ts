export type Payments = {
  qrImage: string;
  description: string;
  status: IStatus;
};

type IStatus = {
  tran_id: string;
  orderId: string;
};

export type PaymentItem = {
  amount: number;
  items: Item[];
};

type Item = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
};
