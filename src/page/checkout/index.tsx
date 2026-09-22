"use client";

import React from "react";
import Payment from "../payment";
import { Ticket } from "@/components";
import { Tickets } from "@/model/ticket";
import { PaymentItem } from "@/model/payment";

type CheckoutProps = {
  isOpen: boolean;
  items: Tickets | null;
  onClose: () => void;
};

export default function Checkout({ isOpen, onClose, items }: CheckoutProps) {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [checkout, setCheckout] = React.useState<PaymentItem>();

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, items?._id]);

  const onCheckout = () => {
    if (!items) return;

    const value: PaymentItem = {
      amount: items.price * quantity,
      items: [
        {
          _id: items._id || "",
          name: items.name,
          price: items.price,
          quantity,
        },
      ],
    };

    setCheckout(value);

    onClose();

    setOpen(true);
  };

  return (
    <>
      {isOpen && items && (
        <div
          className="fixed inset-0 z-100 flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-4"
          onMouseDown={onClose}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-zinc-800 bg-[#0b0b0f] shadow-[0_25px_100px_rgba(0,0,0,0.8)] sm:rounded-3xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-red-500/10 to-transparent" />

            <div className="relative flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
              <div>
                <h2 className="mt-1 text-lg font-semibold text-white uppercase">
                  your tickets {items.name}
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
              <Ticket item={items} />

              <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Select Ticket Quantity
                  </label>

                  <span className="font-mono text-[10px] text-zinc-400">
                    Max: {items.available ?? 0}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-2">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
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
                    onClick={() =>
                      setQuantity((current) =>
                        Math.min(items.available ?? 0, current + 1),
                      )
                    }
                    disabled={quantity >= (items.available ?? 0)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-xl font-bold text-white transition-all hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="relative w-full overflow-hidden rounded-3xl bg-zinc-950 p-6 shadow-2xl">
                <div className="mb-5 text-sm font-medium text-zinc-200">
                  Order
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Price</span>

                    <div className="text-right font-mono">
                      <span className="font-semibold text-zinc-100">
                        ${items.price.toFixed(2)}
                      </span>

                      <span className="ml-1 text-xs text-zinc-500">
                        ({(items.price * 4000).toLocaleString()}៛)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Quantity</span>

                    <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-zinc-800 px-2 text-xs font-bold text-white">
                      {quantity}
                    </span>
                  </div>

                  <div className="my-4 h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

                  <div className="mb-2 flex items-end justify-between font-mono">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Total
                      </p>

                      <p className="mt-3 text-3xl font-extrabold text-white">
                        ${(items.price * quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right text-sm font-medium text-emerald-400">
                      {(items.price * quantity * 4000).toLocaleString()}៛
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onCheckout}
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
      )}

      {open && checkout && (
        <Payment isOpen={open} item={checkout} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
