"use client";

import React, { useEffect } from "react";
import MyImage from "@/components/image";
import { CheckoutData } from "@/model/ticket";
import { getCurrentUser } from "@/lib/auth";
import { checkPayment, createPayment } from "@/service/payment.service";
import { PaymentCheckResponse, PaymentResponse } from "@/model/payment";

type PaymentProps = {
  isOpen: boolean;
  item: CheckoutData;
  onClose: () => void;
};

export default function Payment({ isOpen, item, onClose }: PaymentProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [payment, setPayment] = React.useState<PaymentResponse | null>(null);
  const [check, setCheck] = React.useState<PaymentCheckResponse | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const loadPayment = async () => {
      try {
        setLoading(true);
        setError(null);
        setPayment(null);

        const response = await getCurrentUser();

        const user = response?.user || response?.data || response;

        if (!user) {
          throw new Error("User information not found");
        }

        const paymentData = await createPayment(item, {
          firstname: user.firstName || "",
          lastname: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
        });

        if (cancelled) return;

        setPayment(paymentData);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Unable to create payment",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPayment();

    return () => {
      cancelled = true;
    };
  }, [isOpen, item]);

  useEffect(() => {
    if (!isOpen || !payment?.tran_id) return;

    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const check = async () => {
      try {
        const result = await checkPayment(payment.tran_id);

        if (cancelled) return;

        setCheck(result);

        const status = result.data?.payment_status?.toUpperCase();

        if (
          status === "PAID" ||
          status === "SUCCESS" ||
          status === "COMPLETED"
        ) {
          return;
        }

        timeout = setTimeout(check, 2000);
      } catch (err) {
        if (cancelled) return;

        timeout = setTimeout(check, 3000);
      }
    };

    check();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [isOpen, payment?.tran_id]);

  if (!isOpen) return null;

  const paymentSuccess =
    check?.data?.payment_status?.toUpperCase() === "SUCCESS";

  useEffect(() => {
    if (!paymentSuccess) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [paymentSuccess, onClose]);

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        {loading && (
          <div className="flex min-h-80 flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black" />

            <p className="mt-5 text-sm font-medium text-zinc-600">
              Creating payment...
            </p>
          </div>
        )}

        {!loading && !error && !paymentSuccess && payment && (
          <div className="text-center">
            <h2 className="text-xl font-bold uppercase text-black">
              Scan to Pay
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Scan this QR code with your banking app
            </p>

            {payment.qrImage && (
              <div className="mx-auto mt-5 w-fit rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                <MyImage src={payment.qrImage} alt="PayWay QR Code" />
              </div>
            )}

            <div className="mt-5 rounded-xl bg-zinc-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Amount</span>

                <span className="text-lg font-bold text-black">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-zinc-500">Quantity</span>

                <span className="font-semibold text-black">
                  {item.quantity}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 block w-full rounded-xl bg-black py-3 text-center font-semibold text-white transition hover:bg-zinc-800"
            >
              Close
            </button>
          </div>
        )}

        {paymentSuccess && (
          <div className="relative flex flex-col items-center overflow-hidden py-6 text-center">
            <div className="pointer-events-none absolute inset-0">
              <span className="absolute left-10 top-8 animate-[sparkle_1.8s_ease-in-out_infinite] text-xl text-yellow-400">
                ✦
              </span>
              <span className="absolute right-10 top-12 animate-[sparkle_2s_ease-in-out_infinite_0.3s] text-sm text-emerald-400">
                ✦
              </span>
              <span className="absolute left-16 top-32 animate-[sparkle_2.2s_ease-in-out_infinite_0.5s] text-sm text-pink-400">
                ✧
              </span>
              <span className="absolute right-16 top-28 animate-[sparkle_1.7s_ease-in-out_infinite_0.7s] text-lg text-blue-400">
                ✦
              </span>
              <span className="absolute bottom-20 left-12 animate-[sparkle_2.4s_ease-in-out_infinite_0.2s] text-xs text-yellow-400">
                ✧
              </span>
              <span className="absolute bottom-24 right-12 animate-[sparkle_2s_ease-in-out_infinite_0.9s] text-sm text-emerald-400">
                ✦
              </span>
            </div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-200 opacity-50" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-zinc-900">
              Payment Successful!
            </h2>
            <p className="mt-1 max-w-xs text-sm leading-6 text-zinc-500">
              Yay! Your payment is complete. Your ticket is officially
              confirmed.
            </p>
            <div className="mt-5 rounded-full bg-emerald-50 px-4 py-2">
              <p className="text-xs font-semibold text-emerald-600">
                All done! Enjoy your event!
              </p>
            </div>
            <p className="mt-4 text-xs text-zinc-400">
              A confirmation email has been sent with your order details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
