import {
  PaymentResponse,
  CreatePaymentData,
  PaymentCheckResponse,
} from "@/model/payment";
import { CheckoutData } from "@/model/ticket";

export async function createPayment(
  item: CheckoutData,
  user: CreatePaymentData,
): Promise<PaymentResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tran_id: `TRX-${Date.now()}`,
      amount: item.price.toFixed(2),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    }),
  });

  const data: PaymentResponse = await response.json();

  if (!response.ok) {
    throw new Error(data?.description || "Payment request failed");
  }

  return data;
}

export async function checkPayment(
  tranId: string,
): Promise<PaymentCheckResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: tranId,
      }),
    },
  );

  const result: PaymentCheckResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.status?.message || "Unable to check payment status",
    );
  }

  return result;
}
