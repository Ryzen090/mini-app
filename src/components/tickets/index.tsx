import React from "react";
import { Zone } from "@/model/ticket";
import { QRCode } from "..";

export const DEFAULT_CPL_LOGO =
  "https://pkrsr-public-production.s3.ap-southeast-1.amazonaws.com/attachments/TZ5D6VKK-1720763721.png";
export const DEFAULT_CLUB_LOGO =
  "https://pkrsr-public-production.s3.ap-southeast-1.amazonaws.com/attachments/7PN6TGVS-1752048232.png";

export interface TicketProps {
  item: Zone;
}

export const Ticket: React.FC<TicketProps> = ({ item }: TicketProps) => {
  return (
    <div
      className="relative select-none transition-all duration-300"
      style={{
        fontFamily: "'Kantumruy Pro', 'Outfit', sans-serif",
      }}
    >
      <div
        className="relative mx-auto flex w-full max-w-240 flex-row overflow-hidden rounded-2xl bg-[#650303] text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        style={{
          minHeight: "260px",
          background:
            "linear-gradient(135deg, #420202 0%, #680505 30%, #870808 50%, #4a0303 80%, #2f0101 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 75% 20%, #ff2a2a 0%, transparent 45%), radial-gradient(circle at 20% 80%, #e11d48 0%, transparent 40%)",
          }}
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
          preserveAspectRatio="none"
          viewBox="0 0 960 280"
        >
          <path
            d="M 120,0 C 220,120 300,280 440,280 L 380,280 C 260,280 170,140 80,0 Z"
            fill="url(#redGlowGrad1)"
          />
          <path
            d="M 680,0 C 760,80 820,200 960,240 L 960,200 C 840,160 780,60 720,0 Z"
            fill="url(#redGlowGrad2)"
          />
          <path
            d="M 280,0 C 350,90 420,280 560,280 L 520,280 C 390,280 320,100 250,0 Z"
            fill="url(#redGlowGrad3)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="redGlowGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#990000" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="redGlowGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff2e2e" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#660000" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="redGlowGrad3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff7070" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b30000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 flex w-[26%] flex-col items-center justify-between border-r-2 border-dashed border-red-400/40 bg-black/20 p-3 text-center sm:w-[22%] sm:p-4">
          <div className="absolute -top-3.5 -right-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
          <div className="absolute -bottom-3.5 -right-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]" />

          <div className="flex flex-col items-center pt-1">
            <div className="flex select-none flex-col items-center">
              <div className="relative flex h-10 w-12 items-center justify-center p-0.5 sm:h-14 sm:w-16">
                <img
                  src={DEFAULT_CPL_LOGO}
                  className="h-full w-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="my-auto w-full space-y-2 px-1">
            <div>
              <span className="mb-1 block text-[8px] font-semibold leading-tight text-red-200/90 sm:text-[9px]">
                តម្លៃសំបុត្រ
              </span>
              <div className="rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-xs font-bold tracking-wide text-slate-900 shadow-sm sm:text-sm">
                {(item?.price * 4000).toLocaleString()}
              </div>
            </div>

            <div>
              <span className="mb-1 block text-[8px] font-semibold leading-tight text-red-200/90 sm:text-[9px]">
                ប្រភេទសំបុត្រ
              </span>
              <div className="rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-xs font-black tracking-wider text-slate-900 uppercase shadow-sm sm:text-sm">
                {item?.id}
              </div>
            </div>
          </div>

          <div className="w-full pb-1 text-center">
            <span className="block text-[7px] font-bold tracking-wider text-red-200/80 uppercase sm:text-[8px]">
              WWW.CPL-CAMBODIA.COM
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-between p-3 sm:p-5">
          <div className="pt-0.5 text-center">
            <h2
              className="text-sm font-black tracking-wide leading-tight text-white sm:text-lg lg:text-xl"
              style={{
                fontFamily: "'Battambang', 'Kantumruy Pro', sans-serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              ជម្រើសជើងឯកខេមបូឌានព្រីមៀរលីក ឆ្នាំ២០២៦/២៧
            </h2>
            <p className="mt-0.5 text-[9px] font-extrabold tracking-widest text-red-200/95 uppercase drop-shadow sm:text-[11px]">
              CAMBODIAN PREMIER LEAGUE 2026/27
            </p>
          </div>

          <div className="my-auto grid grid-cols-12 items-center gap-2 py-2 sm:gap-3">
            <div className="col-span-5 flex items-center gap-2 sm:col-span-4">
              <div className="group relative shrink-0 select-none rounded-xl border border-slate-200 bg-white p-1 shadow-md">
                <QRCode _id={item._id} />
              </div>
            </div>

            <div className="col-span-7 space-y-1 text-left sm:col-span-4"></div>

            <div className="hidden flex-col justify-center space-y-2 pl-2 sm:col-span-4 sm:flex pb-4">
              <div>
                <span className="mb-1 block text-center text-[8px] font-semibold leading-none text-red-200/90 lg:text-[9px]">
                  PRICE TICKET
                </span>
                <div className="rounded-xl bg-white px-2 py-1 text-center text-xs font-black text-slate-950 shadow-md lg:text-sm">
                  {(item?.price * 4000).toLocaleString()}
                </div>
              </div>

              <div>
                <span className="mb-1 block text-center text-[8px] font-semibold leading-none text-red-200/90 lg:text-[9px]">
                  CATEGORY
                </span>
                <div className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-center text-xs font-black text-slate-950 uppercase shadow-md lg:text-sm">
                  {item?.id}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Ribbon Strip */}
          <div className="-mx-3 -mb-3 flex items-center justify-between rounded-b-xl bg-[#b91c1c] px-3 py-1 text-[7px] font-bold tracking-wider text-white uppercase sm:-mx-5 sm:-mb-5 sm:text-[8px]">
            <span>CPL SEASON 2026/27</span>
            <span className="hidden sm:inline">WWW.CPL-CAMBODIA.COM</span>
            <span>NO. CPL-2026-884920</span>
          </div>
        </div>

        {/* SECTION 3: RIGHT TEAR-OFF STUB */}
        <div className="relative z-10 flex w-[26%] flex-col items-center justify-between border-l-2 border-dashed border-red-400/40 bg-black/20 p-3 text-center sm:w-[22%] sm:p-4">
          <div className="absolute -top-3.5 -left-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
          <div className="absolute -bottom-3.5 -left-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]" />

          <div className="flex flex-col items-center pt-1">
            <div className="flex select-none flex-col items-center">
              <div className="relative flex h-10 w-12 items-center justify-center p-0.5 sm:h-14 sm:w-16">
                <img
                  src={DEFAULT_CLUB_LOGO}
                  className="h-full w-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="my-auto w-full space-y-2 px-1">
            <div>
              <span className="mb-1 block text-[8px] font-semibold leading-tight text-red-200/90 sm:text-[9px]">
                PRICE
              </span>
              <div className="rounded-lg bg-white px-1.5 py-1 text-xs font-black tracking-wide text-slate-950 shadow-sm sm:text-sm">
                ${item.price.toFixed(2)}
              </div>
            </div>

            <div>
              <span className="mb-1 block text-[8px] font-semibold leading-tight text-red-200/90 sm:text-[9px]">
                SEAT
              </span>
              <div className="rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-xs font-black tracking-wider text-slate-900 uppercase shadow-sm sm:text-sm">
                {item?.id}
              </div>
            </div>
          </div>

          <div className="w-full pb-1 text-center">
            <span className="block text-[7px] font-extrabold tracking-wider text-red-200/90 uppercase sm:text-[8px]">
              CPL 2026/27
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
