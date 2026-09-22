import { Tickets } from "@/model/ticket";

export interface TicketListResponse {
  data: {
    items: Tickets[];
    total: number;
    limit: number;
    page: number;
    pageSize: number;
  };
  statusCode: number;
  message: string;
}

export async function getTickets(): Promise<Tickets[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result: TicketListResponse = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to get tickets");
  }

  return result.data.items;
}
