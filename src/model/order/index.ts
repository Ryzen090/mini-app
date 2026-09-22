import { PAYMENT_STATUS } from "../enum";

export interface Orders {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  totalAmount?: number;
  orderIds: string[];
  tranIds: string[];
  orderCount?: number;
}
