"use client";

import QR from "@/components/qr";
import { Orders } from "@/model/order";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

interface ScanProps {
  isOpen: boolean;
  item: Orders | null;
  onClose: () => void;
}

export default function Scan({ isOpen, item, onClose }: ScanProps) {
  if (!isOpen || !item) return null;

  const orderIds = item.orderIds ?? [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl transition-all duration-300 animate-fadeIn"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d0d12] shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-indigo-600/20 blur-[60px] pointer-events-none" />

        <div className="relative flex items-center justify-between px-6 pt-6 pb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
              Verified Pass
            </span>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Ticket Zone {item.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 transition-transform"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          {orderIds.length > 0 ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              className="w-full pb-8 !overflow-visible"
            >
              {orderIds.map((orderId, index) => (
                <SwiperSlide key={`${orderId}-${index}`} className="w-full">
                  <div className="relative flex w-full flex-col items-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-2xl backdrop-blur-md">
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 border border-white/5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-300">
                        Ticket {index + 1} of {orderIds.length}
                      </span>
                    </div>

                    <div className="relative group/qr flex w-full items-center justify-center rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.02]">
                      <QR _id={orderId} className="h-52 w-52" />
                    </div>

                    <div className="relative my-5 w-full flex items-center justify-between text-zinc-700">
                      <div className="absolute -left-10 h-5 w-5 rounded-full bg-[#0d0d12] border-r border-white/10" />
                      <div className="w-full border-t border-dashed border-white/15 mx-3" />
                      <div className="absolute -right-10 h-5 w-5 rounded-full bg-[#0d0d12] border-l border-white/10" />
                    </div>

                    <div className="w-full text-center">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
                        Secure Token ID
                      </span>
                      <p className="font-mono text-xs tracking-wider text-zinc-400 bg-black/40 py-2 px-3 rounded-xl border border-white/5 truncate">
                        {orderId}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-zinc-500 mb-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-zinc-300">
                No tickets available
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Your purchased passes will show up here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
