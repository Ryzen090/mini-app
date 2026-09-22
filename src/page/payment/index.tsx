"use client";

import MyImage from "@/components/image";
import { PAYMENT_STATUS } from "@/model/enum";
import React, { useEffect, useState } from "react";
import { PaymentItem, Payments } from "@/model/payment";
import { checkPayment, createPayment } from "@/service/payment.service";

type PaymentProps = {
  isOpen: boolean;
  item: PaymentItem;
  onClose: () => void;
};

export default function Payment({ isOpen, item, onClose }: PaymentProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<Payments | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setPayment(null);
      setSuccess(false);
      setError(null);
      return;
    }

    let isMounted = true;

    async function initializePayment() {
      try {
        setLoading(true);
        setError(null);
        const response = await createPayment(item);
        if (isMounted) {
          setPayment(response as unknown as Payments);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to initialize payment. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initializePayment();

    return () => {
      isMounted = false;
    };
  }, [isOpen, item]);

  useEffect(() => {
    const tranId = payment?.status?.tran_id;
    if (!tranId || success || !isOpen) return;

    const interval = setInterval(async () => {
      try {
        const result = await checkPayment(tranId);
        if (result?.data?.payment_status === PAYMENT_STATUS.SUCCESS) {
          setSuccess(true);
          clearInterval(interval);
        }
      } catch (err) {}
    }, 5000);

    return () => clearInterval(interval);
  }, [payment?.status?.tran_id, success, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl transition-all"
      >
        {loading && (
          <div className="flex min-h-[320px] flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black" />
            <p className="mt-5 text-sm font-medium text-zinc-600">
              Creating payment...
            </p>
          </div>
        )}

        {!loading && !error && !success && payment && (
          <div className="text-center">
            <h2 className="text-xl font-bold uppercase text-black">
              Scan to Pay
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Scan this QR code with your banking app
            </p>

            {payment.qrImage && (
              <div className="mx-auto mt-4 w-fit rounded-xl border p-2">
                <MyImage
                  src={payment.qrImage}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mt-5 rounded-xl bg-[#f6f6f6] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Amount</span>
                <span className="text-lg font-bold text-black">
                  ${item.amount.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-zinc-500">Quantity</span>
                <span className="font-semibold text-black">
                  {item.items?.[0]?.quantity ?? 1}
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

        {success && (
          <div className="relative flex flex-col items-center overflow-hidden pt-6 text-center">
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

            <button
              type="button"
              onClick={onClose}
              className="mt-6 block w-full rounded-xl bg-black py-3 text-center font-semibold text-white transition hover:bg-zinc-800"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
