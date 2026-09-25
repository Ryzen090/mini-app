"use client";

import React from "react";

import Checkout from "../checkout";
import Stadium from "@/components/stadium";

import { Tickets } from "@/model/ticket";
import { STATUS } from "@/model/enum";

export default function HomePage() {
  const [open, setOpen] = React.useState(false);
  const [tickets, setTickets] = React.useState<Tickets[]>([]);
  const [items, setItems] = React.useState<Tickets | null>(null);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [selectedStand, setSelectedStand] = React.useState<string | null>(null);

  const featAPI = React.useCallback(async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();
    setTickets(result.data.items || []);
  }, []);

  React.useEffect(() => {
    featAPI();
  }, [featAPI]);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | SVGElement | null;
      if (target?.closest("[data-stand-card]")) {
        return;
      }
      setSelectedStand(null);
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handlePointerOver = (e: React.PointerEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;

    const group = target.closest("g[id]") as SVGGElement | null;

    if (group?.id) {
      setHovered(group.id);
    }
  };

  const handlePointerOut = (e: React.PointerEvent<SVGSVGElement>) => {
    const related = e.relatedTarget as SVGElement | null;

    if (!related || !related.closest("#StDio_x5F_mapundefined")) {
      setHovered(null);
    }
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;

    const group = target.closest("g[id]") as SVGGElement | null;

    if (!group?.id) {
      setSelectedStand(null);
      return;
    }

    const ticket = tickets.find((ticket) => ticket.name === group.id);

    if (!ticket || ticket.status === STATUS.InActive) return;

    setItems(ticket);
    setOpen(true);
  };

  const handleCardClick = (standId: string) => {
    setSelectedStand((prev) => (prev === standId ? null : standId));
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col relative overflow-hidden pt-24 pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-112.5 bg-linear-to-b from-[#ff3b30]/15 via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 max-w-360 w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10 flex flex-col gap-6">
        <div className="w-full bg-linear-to-b from-zinc-900/95 via-zinc-950/95 to-black backdrop-blur-2xl rounded-3xl border border-zinc-800/90 p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff3b30]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/4 via-transparent to-transparent pointer-events-none" />

          <div className="w-full mb-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Cambodian Premier League
                </span>
              </div>

              <div className="flex w-full max-w-2xl items-center justify-center gap-6 sm:gap-12">
                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950">
                    <span className="text-[9px] font-bold text-zinc-600">
                      LOGO
                    </span>
                  </div>

                  <h3 className="mt-3 text-center text-sm sm:text-base font-black uppercase text-white">
                    Phnom Penh Crown
                  </h3>
                </div>

                <div className="flex shrink-0 flex-col items-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                    28 Sep 2026
                  </span>

                  <span className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
                    06:00
                  </span>

                  <span className="mt-1 text-[10px] font-black uppercase italic text-red-500">
                    VS
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950">
                    <span className="text-[9px] font-bold text-zinc-600">
                      LOGO
                    </span>
                  </div>

                  <h3 className="mt-3 text-center text-sm sm:text-base font-black uppercase text-white">
                    Visakha FC
                  </h3>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
                <span>PKRSR STADIUM</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-800" />

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Select Your Stand
              </span>

              <div className="h-px flex-1 bg-zinc-800" />
            </div>
          </div>

          <Stadium
            tickets={tickets}
            handleClick={handleClick}
            hoveredSection={hovered}
            selectedSection={open ? items?.name : selectedStand}
            handlePointerOver={handlePointerOver}
            handlePointerOut={handlePointerOut}
          />

          <Checkout
            isOpen={open}
            items={items}
            onClose={() => {
              setOpen(false);
              setItems(null);
              setHovered(null);
            }}
          />

          <div className="w-full mt-6 pt-6 border-t border-zinc-800/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  id: "A",
                  name: "VIP Main Stand",
                  sub: "A1 (Lower) / A2 (Upper)",
                  color: "#e53935",
                },
                {
                  id: "B",
                  name: "East Grandstand",
                  sub: "B1 (Lower) / B2 (Upper)",
                  color: "#2e7d32",
                },
                {
                  id: "C",
                  name: "South Goal Stand",
                  sub: "C1 (Lower) / C2 (Upper)",
                  color: "#1e88e5",
                },
                {
                  id: "D",
                  name: "North Goal Stand",
                  sub: "D1 (Lower) / D2 (Upper)",
                  color: "#8e24aa",
                },
              ].map((item) => {
                const isHovered =
                  hovered === item.id || hovered?.startsWith(item.id);
                const isSelected =
                  selectedStand === item.id ||
                  (open && Boolean(items?.name?.startsWith(item.id)));
                const isActive = isHovered || isSelected;

                return (
                  <div
                    key={item.id}
                    data-stand-card
                    onClick={() => handleCardClick(item.id)}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`group flex items-center gap-3 rounded-xl p-3 border transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? "bg-zinc-900/90 scale-[1.02]"
                        : "bg-zinc-950/60 border-zinc-800/60 hover:bg-zinc-900/70 hover:border-zinc-700/80 hover:scale-[1.01]"
                    }`}
                    style={{
                      borderColor: isActive ? item.color : undefined,
                      boxShadow: isActive
                        ? `0 0 20px ${item.color}35, inset 0 0 12px ${item.color}15`
                        : undefined,
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-md shadow-sm shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: item.color,
                        transform: isActive ? "scale(1.15)" : undefined,
                        boxShadow: isActive
                          ? `0 0 12px ${item.color}80`
                          : undefined,
                      }}
                    />

                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold truncate transition-colors duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-zinc-200 group-hover:text-white"
                        }`}
                      >
                        {item.name}
                      </p>

                      <p
                        className={`text-[10px] truncate transition-colors duration-200 ${
                          isActive ? "text-zinc-300" : "text-zinc-400"
                        }`}
                      >
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
