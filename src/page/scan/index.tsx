"use client";

import QR from "@/components/qr";
import { Orders } from "@/model/order";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-[#0b0b0f] shadow-[0_25px_100px_rgba(0,0,0,0.8)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <p className="text-[24px] font-medium uppercase tracking-wider text-zinc-500">
            My Ticket
          </p>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
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

        <div className="p-5">
          {orderIds.length > 0 ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              className="ticket-swiper"
            >
              {orderIds.map((orderId, index) => (
                <SwiperSlide key={orderId}>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                    <div className="flex justify-center rounded-2xl p-5">
                      <QR _id={orderId} className="h-60 w-60" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
              <p className="text-sm text-zinc-500">No tickets available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
