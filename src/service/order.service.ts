import { Orders } from "@/model/order";

export interface OrderListResponse {
  data: any[];
  statusCode: number;
  message: string;
}

export async function getOrders(): Promise<Orders[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    return [];
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result: OrderListResponse = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to get tickets");
  }

  return result.data;
}
