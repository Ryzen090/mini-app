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
  const progressPercentage = (timeLeft / PAYMENT_TIMEOUT_MS) * 100;

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-zinc-950/5 text-center transform transition-all animate-in zoom-in-95 duration-200"
      >
        <div>
          {loading && (
            <div className="flex h-64 flex-col items-center justify-center space-y-3">
              <Loader size={36} color="black" />
            </div>
          )}

          {error && (
            <div className="flex h-64 flex-col items-center justify-center px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 mb-3">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <p className="text-xs font-medium text-zinc-800 mb-1">
                Something went wrong
              </p>
              <p className="text-[11px] text-zinc-400 mb-5">{error}</p>
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-zinc-900 py-2.5 text-xs text-white font-medium hover:bg-zinc-800 transition shadow-sm"
              >
                Dismiss
              </button>
            </div>
          )}

          {!loading && !error && !success && payment && (
            <div>
              <div className="mb-5 rounded-2xl bg-zinc-50 p-4 border border-zinc-100/80 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Total Amount
                  </span>
                  <span className="text-2xl font-mono font-bold tracking-tight text-zinc-900">
                    ${price}
                  </span>
                </div>
              </div>

              {payment.qrImage && (
                <div className="relative mx-auto mb-4 w-fit rounded-2xl bg-white p-3.5 border border-zinc-100 shadow-md ring-4 ring-zinc-50">
                  <MyImage
                    src={payment.qrImage}
                    className="h-48 w-48 object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-zinc-900 px-3 py-0.5 text-[10px] font-medium text-white shadow-sm">
                    Scan to Pay
                  </div>
                </div>
              )}

              <p className="text-[11px] text-zinc-400 mb-5 mt-3">
                Open any mobile banking app to scan & complete payment
              </p>

              <div className="mb-5 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-zinc-400 font-medium">
                    Session Expires
                  </span>
                  <span
                    className={`font-mono font-bold ${timeLeft < 60000 ? "text-red-500 animate-pulse" : "text-zinc-700"}`}
                  >
                    {formattedTime}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${timeLeft < 60000 ? "bg-red-500" : "bg-zinc-900"}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-xl bg-zinc-100 py-3 text-xs font-semibold text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition"
              >
                Cancel Payment
              </button>
            </div>
          )}

          {success && (
            <div className="relative flex flex-col items-center overflow-hidden pt-4 text-center">
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute left-6 top-4 animate-bounce text-lg text-amber-400">
                  ✦
                </span>
                <span className="absolute right-6 top-8 animate-pulse text-xs text-emerald-400">
                  ✦
                </span>
                <span className="absolute left-8 top-24 animate-pulse text-xs text-rose-400">
                  ✧
                </span>
                <span className="absolute right-8 top-20 animate-bounce text-sm text-sky-400">
                  ✦
                </span>
              </div>

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50 mb-3">
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-200 opacity-40" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-md shadow-emerald-500/20">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
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

              <h2 className="text-base font-bold tracking-tight text-zinc-900">
                Payment Successful!
              </h2>
              <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-zinc-400">
                Your transaction has been verified and your ticket is confirmed.
              </p>

              <div className="mt-4 rounded-xl bg-emerald-50/80 border border-emerald-100 px-4 py-2 w-full">
                <p className="text-xs font-semibold text-emerald-700">
                  🎉 All done! Enjoy your event!
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 block w-full rounded-xl bg-zinc-900 py-3 text-center text-xs font-semibold text-white transition hover:bg-zinc-800 shadow-sm"
              >
                Done & Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
