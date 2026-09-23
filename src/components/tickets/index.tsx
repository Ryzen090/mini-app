import React from "react";

import { QRCode } from "..";
import { Tickets } from "@/model/ticket";

export const DEFAULT_CPL_LOGO =
  "https://pkrsr-public-production.s3.ap-southeast-1.amazonaws.com/attachments/TZ5D6VKK-1720763721.png";

export const DEFAULT_CLUB_LOGO =
  "https://pkrsr-public-production.s3.ap-southeast-1.amazonaws.com/attachments/7PN6TGVS-1752048232.png";

export interface TicketProps {
  item: Tickets | any;
}

export const Ticket: React.FC<TicketProps> = ({ item }) => {
  return (
    <div
      className="relative w-full select-none"
      style={{
        fontFamily: "'Kantumruy Pro', 'Outfit', sans-serif",
      }}
    >
      <div
        className="
          relative mx-auto flex w-full max-w-240
          overflow-hidden rounded-xl bg-[#650303]
          text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]
          sm:rounded-2xl
        "
        style={{
          minHeight: "220px",
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

        <div
          className="
            relative z-10 flex w-[27%] shrink-0 flex-col
            items-center justify-between border-r-2
            border-dashed border-red-400/40 bg-black/20
            p-2 text-center sm:w-[22%] sm:p-4
          "
        >
          <div className="absolute -right-3.5 -top-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f]" />
          <div className="absolute -bottom-3.5 -right-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f]" />

          <div className="flex translate-y-4 flex-col items-center sm:translate-y-0">
            <div className="relative flex h-12 w-22 items-center justify-center sm:h-14 sm:w-16">
              <img
                src={DEFAULT_CPL_LOGO}
                alt="CPL"
                className="h-12 w-22 object-contain drop-shadow-md sm:h-14 sm:w-16"
              />
            </div>
          </div>

          <div className="mt-6 my-auto w-full space-y-1.5 px-0.5 sm:mt-2.5 sm:space-y-2 sm:px-1">
            <div>
              <span className="mb-0.5 block font-mono text-[6px] font-bold tracking-[0.15em] text-red-200/90 uppercase sm:text-[8.5px]">
                [ PRICE ]
              </span>

              <div className="truncate rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-[10px] font-black text-slate-900 sm:text-sm">
                {((item?.price ?? 0) * 4000).toLocaleString()}
                <span className="ml-0.5 text-[7px] font-normal text-slate-500 sm:text-[9px]">
                  KHR
                </span>
              </div>
            </div>

            <div>
              <span className="mb-0.5 block font-mono text-[6px] font-bold tracking-[0.15em] text-red-200/90 uppercase sm:text-[8.5px]">
                [ TICKET ]
              </span>

              <div className="truncate rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-[10px] font-black tracking-wider text-slate-900 uppercase sm:text-sm">
                {item?.name ?? "-"}
              </div>
            </div>
          </div>

          <div className="w-full pb-0.5 text-center">
            <span className="block truncate font-mono text-[5px] font-bold tracking-[0.15em] text-red-300/80 uppercase sm:text-[8px]">
              WWW.CPL-CAMBODIA.COM
            </span>
          </div>
        </div>

        <div
          className="
            relative z-10 flex min-w-0 flex-1 flex-col
            justify-between p-2.5 sm:p-5
          "
        >
          <div className="pt-0.5 text-center sm:pt-0.5 sm:translate-y-0">
            <h2
              className="
                translate-y-6 text-[11px] font-black leading-tight
                tracking-wide text-white sm:translate-y-0
                sm:text-lg lg:text-xl
              "
              style={{
                fontFamily: "'Battambang', 'Kantumruy Pro', sans-serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              ជម្រើសជើងឯកខេមបូឌានព្រីមៀរលីក
            </h2>

            <p className="mt-0.5 translate-y-6 truncate font-mono text-[6px] font-extrabold tracking-[0.15em] text-red-200 uppercase sm:translate-y-0 sm:text-[10px] sm:tracking-[0.25em]">
              CAMBODIAN PREMIER LEAGUE
            </p>
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2 py-1 sm:my-auto sm:gap-3">
            <div className="min-w-0 flex-1 space-y-1.5 font-mono sm:space-y-2">
              <div className="min-w-0">
                <span className="text-[5.5px] text-red-300 uppercase sm:text-[6.5px]">
                  STADIUM / កីឡដ្ឋាន
                </span>

                <p className="truncate text-[9px] font-black tracking-wide text-white uppercase sm:text-xs">
                  {item?.stadium ?? "OLYMPIC NATIONAL STADIUM"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 border-t border-red-400/20 pt-1.5 sm:gap-2">
                <div className="min-w-0">
                  <span className="text-[5.5px] text-red-300 uppercase sm:text-[6.5px]">
                    DATE / កាលបរិច្ឆេទ
                  </span>

                  <p className="truncate text-[9px] font-black sm:text-[13px]">
                    {item?.date ?? "24 OCT 2026"}
                  </p>
                </div>

                <div className="min-w-0">
                  <span className="text-[5.5px] text-red-300 uppercase sm:text-[6.5px]">
                    SEAT / កៅអី
                  </span>

                  <p className="truncate text-[9px] font-black uppercase sm:text-[13px]">
                    Zone {item?.name ?? "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 rounded-md border-2 border-white bg-white p-1 shadow-md sm:rounded-lg">
              <QRCode
                _id={item?._id}
                className="h-9 w-9 rounded bg-white sm:h-12 sm:w-12"
              />
            </div>
          </div>

          <div
            className="
              -mx-2.5 -mb-2.5 flex items-center justify-between
              gap-2 rounded-b-xl bg-[#b91c1c] px-2.5 py-1
              font-mono text-[5.5px] font-bold text-white uppercase
              sm:-mx-5 sm:-mb-5 sm:px-3 sm:text-[8px]
            "
          >
            <span className="truncate">DOCUMENTO D'IDENTITÀ RICHIESTO</span>

            <span className="shrink-0">
              ID: #
              {String(item?._id ?? "CPL-001")
                .slice(-6)
                .toUpperCase()}
            </span>
          </div>
        </div>

        <div
          className="
            relative z-10 hidden w-[22%] shrink-0 flex-col
            items-center justify-between border-l-2
            border-dashed border-red-400/40 bg-black/20
            p-3 text-center sm:flex sm:p-4
          "
        >
          <div className="absolute -left-3.5 -top-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f]" />
          <div className="absolute -bottom-3.5 -left-3.5 z-20 h-7 w-7 rounded-full bg-[#0b0b0f]" />

          <div className="flex flex-col items-center pt-1">
            <div className="relative flex h-14 w-16 items-center justify-center">
              <img
                src={DEFAULT_CLUB_LOGO}
                alt="Club"
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>
          </div>

          <div className="my-auto w-full space-y-2 px-1">
            <div>
              <span className="mb-0.5 block font-mono text-[8.5px] font-bold tracking-[0.2em] text-red-200/90 uppercase">
                [ PRICE ]
              </span>

              <div className="rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-sm font-black text-slate-950 shadow-sm">
                ${(item?.price ?? 0).toFixed(2)}
              </div>
            </div>

            <div>
              <span className="mb-0.5 block font-mono text-[8.5px] font-bold tracking-[0.2em] text-red-200/90 uppercase">
                [ SEAT / CAT ]
              </span>

              <div className="truncate rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-sm font-black tracking-wider text-slate-900 uppercase shadow-sm">
                {item?.name ?? "-"}
              </div>
            </div>
          </div>

          <div className="w-full pb-1 text-center">
            <span className="block font-mono text-[8px] font-bold tracking-[0.25em] text-red-300/90 uppercase">
              CPL 2026/27
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
