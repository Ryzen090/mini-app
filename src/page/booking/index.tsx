"use client";

import React from "react";
import { Zone } from "@/model/ticket";

type BookingProps = {
  isOpen: boolean;
  items: Zone | null;
  onClose: () => void;
};

export default function Booking({ isOpen, onClose, items }: BookingProps) {
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, items?.id]);

  if (!isOpen || !items) return null;

  const maxQuantity = items.available ?? 0;

  const total = items.price * quantity;
  const totalRiel = total * 4000;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(maxQuantity, current + 1));
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl border border-zinc-800 bg-[#0b0b0f] shadow-[0_25px_100px_rgba(0,0,0,0.8)] sm:rounded-3xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-red-500/10 to-transparent" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Ticket Selection
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
              Select your tickets
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="relative space-y-5 p-5">
          <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Select Ticket Quantity
              </label>

              <span className="font-mono text-[10px] text-zinc-400">
                Max: {maxQuantity}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-2">
              {/* Minus */}
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-xl font-bold text-white transition-all hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
              >
                −
              </button>

              <div className="px-4 text-center">
                <span className="block text-2xl font-black text-white">
                  {quantity}
                </span>

                <span className="block text-[10px] font-bold uppercase text-zinc-400">
                  {quantity === 1 ? "Ticket" : "Tickets"}
                </span>
              </div>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= maxQuantity}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-xl font-bold text-white transition-all hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-3xl bg-zinc-950 p-6 shadow-2xl">
            <div className="mb-5 text-sm font-medium text-zinc-200">
              Order Summary
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Price per Ticket</span>

                <div className="text-right font-mono">
                  <span className="font-semibold text-zinc-100">
                    ${items.price.toFixed(2)}
                  </span>

                  <span className="ml-1 text-xs text-zinc-500">
                    ({(items.price * 4000).toLocaleString()} ៛)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm font-mono">
                <span className="text-zinc-400">Quantity</span>

                <span className="flex h-6 min-w-[24px] items-center justify-center rounded-md bg-zinc-800 px-2 text-xs font-bold text-white">
                  {quantity}
                </span>
              </div>

              <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

              <div className="mb-2 flex items-end justify-between font-mono">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Total Due
                  </p>

                  <p className="text-3xl font-extrabold text-white">
                    ${total.toFixed(2)}
                  </p>
                </div>

                <div className="text-right text-sm font-medium text-emerald-400">
                  {totalRiel.toLocaleString()} ៛
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99]"
          >
            Checkout
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
