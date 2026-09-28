import { PaymentItem } from "@/model/payment";

export async function createPayment(
  item: PaymentItem,
): Promise<PaymentResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: [
        {
          _id: item.items[0]._id,
          quantity: item.items[0].quantity,
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message);
  }

  return data as PaymentResponse;
}

export async function checkPayment(tranId: string): Promise<any> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tran_id: tranId,
      }),
    },
  );

  const result: any = await response.json();

  return result;
}
