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

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;

    setQuantity(1);
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
  }, [isOpen, items?._id]);

  const onCheckout = () => {
    if (!items) return;

    const value: PaymentItem = {
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
                  tickets {items.name}
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
                    className="flex cursor-pointer h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-xl font-bold text-white transition-all hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
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
                    className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-xl bg-zinc-800 text-xl font-bold text-white transition-all hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
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

              {!isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GOOGLE}`;
                  }}
                  className="group cursor-pointer flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white font-semibold text-zinc-900 transition hover:bg-zinc-100 active:scale-[0.99]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.8c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.8Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.54 13.88A5.86 5.86 0 0 1 6.23 12c0-.65.11-1.28.31-1.88V7.59H3.3A9.8 9.8 0 0 0 2.2 12c0 1.58.38 3.08 1.1 4.41l3.24-2.53Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.09c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.18 14.63 2.2 12 2.2a9.75 9.75 0 0 0-8.7 5.39l3.24 2.53C7.31 7.81 9.46 6.09 12 6.09Z"
                    />
                  </svg>

                  <span>Continue with Google</span>
                </button>
              ) : isLoggedIn ? (
                <button
                  type="button"
                  onClick={onCheckout}
                  className="group cursor-pointer flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-100 hover:shadow-md active:scale-[0.99]"
                >
                  <span>Continue to Payment</span>
                </button>
              ) : null}
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
