"use client";

import { Loader } from "@/components";
import MyImage from "@/components/image";
import { useEffect, useState } from "react";
import { PAYMENT_STATUS } from "@/model/enum";
import { PaymentItem, Payments } from "@/model/payment";
import { checkPayment, createPayment } from "@/service/payment.service";

type PaymentProps = {
  isOpen: boolean;
  item: PaymentItem;
  onClose: () => void;
};

const PAYMENT_TIMEOUT_MS = 60 * 1000;

export default function Payment({ isOpen, item, onClose }: PaymentProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<Payments | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(PAYMENT_TIMEOUT_MS);

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
      setTimeLeft(PAYMENT_TIMEOUT_MS);
      return;
    }

    let isMounted = true;
    async function initializePayment() {
      try {
        setLoading(true);
        setError(null);
        setTimeLeft(PAYMENT_TIMEOUT_MS);
        const response = await createPayment(item);
        if (isMounted) setPayment(response as unknown as Payments);
      } catch (err) {
        if (isMounted) setError("Failed to initialize payment.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    initializePayment();
    return () => {
      isMounted = false;
    };
  }, [isOpen, item]);

  useEffect(() => {
    if (!isOpen || loading || success || error || !payment) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, loading, success, error, payment, onClose]);

  useEffect(() => {
    const tranId = payment?.status?.tran_id;
    if (!tranId || success || !isOpen || error) return;

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
  }, [payment?.status?.tran_id, success, isOpen, error]);

  if (!isOpen) return null;

  const rawPrice = item.items[0]?.price ?? 0;
  const quantity = item.items?.[0]?.quantity ?? 1;
  const price = (rawPrice * quantity).toFixed(2);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-[340px] rounded-3xl bg-white p-6 shadow-xl border border-zinc-100 text-center"
      >
        <div>
          {loading && (
            <div className="flex h-56 flex-col items-center justify-center">
              <Loader size={46} color="black" />
            </div>
          )}

          {error && (
            <div className="flex h-56 flex-col items-center justify-center">
              <p className="text-xs text-red-500 mb-3">{error}</p>
              <button
                onClick={onClose}
                className="rounded-xl bg-zinc-100 px-4 py-2 text-xs text-zinc-700 font-medium hover:bg-zinc-200 transition"
              >
                Close
              </button>
            </div>
          )}

          {!loading && !error && !success && payment && (
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="text-left">
                  <span className="text-xs text-zinc-400 block">
                    Total Amount
                  </span>
                  <span className="text-xl font-mono font-bold text-zinc-900">
                    ${price}
                  </span>
                </div>
              </div>

              {payment.qrImage && (
                <div className="mx-auto mb-4 w-fit rounded-2xl bg-zinc-50 p-3 border border-zinc-100 shadow-sm">
                  <MyImage
                    src={payment.qrImage}
                    className="h-44 w-44 object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-zinc-400 mb-4">
                Scan with any mobile banking app ({quantity}x)
              </p>

              <div className="text-center mb-5">
                <span
                  className={`text-xs font-mono font-semibold px-2 py-1 uppercase rounded-md inline-block ${timeLeft < 60000 ? "bg-red-50 text-red-500" : "bg-zinc-100 text-zinc-700"}`}
                >
                  Expires {formattedTime}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-xl bg-zinc-100 py-2.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200 transition"
              >
                Cancel
              </button>
            </div>
          )}

          {success && (
            <div className="relative flex flex-col items-center overflow-hidden py-2 text-center">
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute left-6 top-4 animate-pulse text-lg text-yellow-400">
                  ✦
                </span>
                <span className="absolute right-6 top-8 animate-pulse text-xs text-emerald-400">
                  ✦
                </span>
                <span className="absolute left-8 top-24 animate-pulse text-xs text-pink-400">
                  ✧
                </span>
                <span className="absolute right-8 top-20 animate-pulse text-sm text-blue-400">
                  ✦
                </span>
              </div>

              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-200 opacity-50" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
                  <svg
                    className="h-6 w-6 text-white"
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

              <h2 className="mt-4 text-base font-bold tracking-tight text-zinc-900">
                Payment Successful!
              </h2>
              <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-zinc-500">
                Yay! Your payment is complete. Your ticket is officially
                confirmed.
              </p>

              <div className="mt-3 rounded-full bg-emerald-50 px-3 py-1">
                <p className="text-[11px] font-semibold text-emerald-600">
                  All done! Enjoy your event!
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 block w-full rounded-xl bg-zinc-900 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-zinc-800 shadow-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
