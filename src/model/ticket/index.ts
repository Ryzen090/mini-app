import { STATUS } from "../enum";

export type Tickets = {
  _id?: string;
  name: string;
  floor: number;
  capacity: number;
  available: number;
  price: number;
  status: STATUS;
  dateCreated?: string;
  dateUpdated?: string;
};
