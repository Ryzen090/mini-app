"use client";

import { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isOpen || !item) return null;

  const orderIds = item.orderIds ?? [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-[360px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#09090e] shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Ambient background glows */}
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-violet-600/20 blur-[50px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-indigo-600/15 blur-[50px] pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-2">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white line-clamp-1">
              {item.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Verified Event Pass
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform"
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

        {/* Content Body */}
        <div className="px-5 pb-6 pt-2">
          {orderIds.length > 0 ? (
            <div className="relative flex w-full flex-col items-center p-5">
              {/* Ticket Counter Badge */}
              <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 border border-white/5">
                <span className="text-[11px] font-semibold text-zinc-300">
                  Pass{" "}
                  <span className="text-violet-400 font-mono">
                    {activeIndex + 1}
                  </span>{" "}
                  of {orderIds.length}
                </span>
              </div>

              {/* Swiper Containing Only the QR Codes */}
              <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                pagination={{
                  clickable: true,
                  bulletClass:
                    "swiper-pagination-bullet !bg-white/20 !opacity-100 !w-1.5 !h-1.5 !transition-all",
                  bulletActiveClass: "!bg-violet-500 !w-4 !rounded-full",
                }}
                className="w-full pb-8 !overflow-visible"
              >
                {orderIds.map((orderId, index) => (
                  <SwiperSlide key={`${orderId}-${index}`} className="w-full">
                    <div className="flex flex-col items-center">
                      {/* QR Code Container with Holographic/Glow Frame */}
                      <div className="relative group/qr flex w-full items-center justify-center rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-white/20 transition-transform duration-300 hover:scale-[1.01]">
                        <QR _id={orderId} className="h-48 w-48" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Ticket Notch Divider (Kept) */}
              <div className="relative my-2 w-full flex items-center justify-between text-zinc-700">
                <div className="absolute -left-8 h-4 w-4 rounded-full bg-[#09090e] border-r border-white/10" />
                <div className="w-full border-t border-dashed border-white/15 mx-2" />
                <div className="absolute -right-8 h-4 w-4 rounded-full bg-[#09090e] border-l border-white/10" />
              </div>

              {/* Order ID Footer (Border removed) */}
              <div className="w-full text-center mt-3">
                <p className="font-mono text-[11px] tracking-wider text-zinc-400 bg-black/50 py-2 px-3 rounded-xl truncate select-all">
                  {orderIds[activeIndex]}
                </p>
              </div>
            </div>
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
