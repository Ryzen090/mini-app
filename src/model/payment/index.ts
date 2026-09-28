export type PaymentItem = {
  items: Item[];
};

export type Item = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
};
