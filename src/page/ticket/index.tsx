"use client";

import Link from "next/link";
import { Ticket } from "@/components";
import { Orders } from "@/model/order";
import { useEffect, useState } from "react";
import { getOrders } from "@/service/order.service";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Scan from "../scan";

export default function BasketPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [scanOrder, setScanOrder] = useState<Orders | null>(null);

  useEffect(() => {
    let isMounted = true;
    getOrders()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        } else {
          setOrders(data || []);
        }
      })
      .catch(() => {
        if (isMounted) setOrders([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const onScan = (item: Orders) => {
    setScanOrder(item);
    setOpen(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050507] pt-[96px] pb-16 text-slate-100">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[450px] w-full max-w-7xl -translate-x-1/2 bg-linear-to-b from-[#ff3b30]/15 via-emerald-500/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-red-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-linear-to-b from-zinc-900/95 via-zinc-950/95 to-black p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-8">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#ff3b30]/15 blur-[80px]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ff3b30] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-400">
                  PKRSR FC
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                Tickets
              </h1>
              <p
                className="mt-0.5 text-xs text-zinc-400"
                style={{
                  fontFamily: "'Battambang', 'Kantumruy Pro', sans-serif",
                }}
              >
                សំបុត្រដែលបានបញ្ជាទិញសម្រាប់ការប្រកួត
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#ff3b30] border-t-transparent" />
            <p className="mt-4 text-sm font-semibold text-zinc-400">
              Loading tickets...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-800/80 bg-zinc-950/60 py-16 text-center backdrop-blur-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              No Tickets Found
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              You haven&apos;t purchased any match tickets yet.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ff3b30] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition duration-200 hover:bg-red-600"
            >
              Matches
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {orders.map((item, idx) => {
              const itemTotal =
                item.totalAmount ?? item.price * (item.quantity || 1);

              return (
                <div
                  key={item._id || idx}
                  className="group relative flex flex-col gap-3 rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition duration-300 hover:border-red-500/40 hover:bg-zinc-950/90 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-950/30 px-2.5 py-1 font-black text-red-400 uppercase">
                        <span>Zone</span>
                        <span className="text-white">{item.name}</span>
                      </span>

                      <span className="rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-bold text-zinc-300">
                        Qty:{" "}
                        <span className="font-extrabold text-white ">
                          {item.quantity}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm  font-bold font-mono text-white sm:text-base">
                          ${itemTotal.toFixed(2)}
                        </span>
                        <span className="ml-1 text-[11px] font-mono text-zinc-400">
                          ({(itemTotal * 4000).toLocaleString()} ៛)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    {item.quantity > 1 ? (
                      <Swiper
                        spaceBetween={16}
                        slidesPerView={1.04}
                        className="w-full"
                      >
                        {Array.from({
                          length: item.quantity || item.orderIds?.length || 1,
                        }).map((_, oIdx) => {
                          const orderId = item.orderIds?.[oIdx];
                          const tranId = item.tranIds?.[oIdx];

                          const singleTicket: Orders = {
                            ...item,
                            _id: tranId || orderId || item._id,
                            orderIds: orderId ? [orderId] : [],
                            tranIds: tranId ? [tranId] : [],
                            quantity: 1,
                            totalAmount: item.price,
                            orderCount: 1,
                          };

                          return (
                            <SwiperSlide
                              key={orderId || tranId || oIdx}
                              className="w-full"
                            >
                              <div
                                onClick={() => onScan(item)}
                                className="cursor-pointer"
                              >
                                <Ticket item={singleTicket} />
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    ) : (
                      <div
                        onClick={() => onScan(item)}
                        className="cursor-pointer"
                      >
                        <Ticket item={item} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {open && (
          <Scan isOpen={open} item={scanOrder} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
}
