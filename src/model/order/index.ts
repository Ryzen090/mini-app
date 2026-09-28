import { ORDER_STATUS } from "../enum";
import { Item } from "../payment";

export interface Orders {
  _id: string;
  orderId?: string;
  tranId?: string;
  userId?: string;
  item: Item;
  quantity: number;
  amount: number;
  tickets: { code: string; status: ORDER_STATUS }[];
}
