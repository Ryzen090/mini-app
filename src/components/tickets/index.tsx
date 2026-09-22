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
              <span className="mb-0.5 block font-mono text-[7.5px] font-bold tracking-[0.2em] text-red-200/90 uppercase sm:text-[8.5px]">
                [ តម្លៃ / PRICE ]
              </span>
              <div className="rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-xs font-black tracking-tight text-slate-900 shadow-sm sm:text-sm">
                {((item?.price ?? 0) * 4000).toLocaleString()}{" "}
                <span className="text-[9px] font-normal text-slate-500">
                  KHR
                </span>
              </div>
            </div>

            <div>
              <span className="mb-0.5 block font-mono text-[7.5px] font-bold tracking-[0.2em] text-red-200/90 uppercase sm:text-[8.5px]">
                [ ប្រភេទ / TICKET ]
              </span>
              <div className="rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-xs font-black tracking-wider text-slate-900 uppercase shadow-sm sm:text-sm">
                {item?.name}
              </div>
            </div>
          </div>

          <div className="w-full pb-1 text-center">
            <span className="block font-mono text-[7px] font-bold tracking-[0.25em] text-red-300/80 uppercase sm:text-[8px]">
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
              ជម្រើសជើងឯកខេមបូឌានព្រីមៀរលីក
            </h2>
            <p className="mt-0.5 font-mono text-[8.5px] font-extrabold tracking-[0.25em] text-red-200 uppercase drop-shadow sm:text-[10px]">
              CAMBODIAN PREMIER LEAGUE
            </p>
          </div>

          <div className="my-auto flex items-center justify-between gap-3 py-1">
            <div className="flex flex-1 flex-col justify-between space-y-1 text-left font-mono">
              <div>
                <span className="text-[6.5px] text-red-300 uppercase">
                  STADIUM / កីឡដ្ឋាន
                </span>
                <p className="text-xs font-black tracking-wide text-white uppercase">
                  {item?.stadium ?? "OLYMPIC NATIONAL STADIUM"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-red-400/20">
                <div>
                  <span className="text-[6.5px] text-red-300 uppercase">
                    DATE / កាលបរិច្ឆេទ
                  </span>
                  <p className="text-[13px] font-black">
                    {item?.date ?? "24 OCT 2026"}
                  </p>
                </div>
                <div>
                  <span className="text-[6.5px] text-red-300 uppercase">
                    SEAT / កៅអី
                  </span>
                  <p className="text-[13px] font-black uppercase">
                    Zone {item?.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-2 border-white bg-white p-1 shadow-md">
              <QRCode _id={item?._id} />
            </div>
          </div>

          <div className="-mx-3 -mb-3 flex items-center justify-between rounded-b-xl bg-[#b91c1c] px-3 py-1 font-mono text-[7px] font-bold text-white uppercase sm:-mx-5 sm:-mb-5 sm:text-[8px]">
            <span>DOCUMENTO D'IDENTITÀ RICHIESTO</span>
            <span>
              ID: #
              {String(item?._id ?? "CPL-001")
                .slice(-6)
                .toUpperCase()}
            </span>
          </div>
        </div>

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
              <span className="mb-0.5 block font-mono text-[7.5px] font-bold tracking-[0.2em] text-red-200/90 uppercase sm:text-[8.5px]">
                [ PRICE ]
              </span>
              <div className="rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-xs font-black tracking-tight text-slate-950 shadow-sm sm:text-sm">
                ${(item?.price ?? 0).toFixed(2)}
              </div>
            </div>

            <div>
              <span className="mb-0.5 block font-mono text-[7.5px] font-bold tracking-[0.2em] text-red-200/90 uppercase sm:text-[8.5px]">
                [ SEAT / CAT ]
              </span>
              <div className="rounded border border-red-200/30 bg-white/95 px-1 py-1 font-mono text-xs font-black tracking-wider text-slate-900 uppercase shadow-sm sm:text-sm">
                {item?.name}
              </div>
            </div>
          </div>

          <div className="w-full pb-1 text-center">
            <span className="block font-mono text-[7px] font-bold tracking-[0.25em] text-red-300/90 uppercase sm:text-[8px]">
              CPL 2026/27
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
