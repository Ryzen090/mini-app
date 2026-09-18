"use client";

import React from "react";
import Stadium from "@/components/stadium";
import { Zone } from "@/model/ticket";
import Booking from "../checkout";

const data = [
  {
    _id: {
      $oid: "6aa79586d5cc804d38f4d662",
    },
    id: "A1",
    name: "Zone A1",
    floor: 1,
    capacity: 1000,
    available: 54,
    price: 15,
    status: 2,
    dateUpdated: {
      $date: "2026-09-17T04:58:44.844Z",
    },
  },
  {
    _id: {
      $oid: "6aa795a9d5cc804d38f4d664",
    },
    id: "A2",
    name: "Zone A2",
    floor: 1,
    capacity: 10,
    available: 10,
    price: 15,
    status: 2,
    dateUpdated: {
      $date: "2026-09-14T07:10:37.552Z",
    },
  },
  {
    _id: {
      $oid: "6aa795b0d5cc804d38f4d666",
    },
    id: "B1",
    name: "Zone B1",
    floor: 2,
    capacity: 10,
    available: 10,
    price: 20,
    status: 2,
    dateUpdated: {
      $date: "2026-09-14T06:54:37.387Z",
    },
  },
  {
    _id: {
      $oid: "6aa795bad5cc804d38f4d668",
    },
    id: "B2",
    name: "Zone B2",
    floor: 2,
    capacity: 10,
    available: 10,
    price: 20,
    status: 2,
    dateUpdated: {
      $date: "2026-09-14T06:49:41.170Z",
    },
  },
  {
    _id: {
      $oid: "6aa795c0d5cc804d38f4d66a",
    },
    id: "C1",
    name: "Zone C1",
    floor: 3,
    capacity: 10,
    available: 10,
    price: 10,
    status: 2,
    dateUpdated: {
      $date: "2026-09-14T07:09:30.016Z",
    },
  },
  {
    _id: {
      $oid: "6aa795c6d5cc804d38f4d66c",
    },
    id: "C2",
    name: "Zone C2",
    floor: 3,
    capacity: 10,
    available: 10,
    price: 10,
    status: 2,
    dateUpdated: {
      $date: "2026-09-14T06:52:32.909Z",
    },
  },
  {
    _id: {
      $oid: "6aa795ccd5cc804d38f4d66e",
    },
    id: "D1",
    name: "Zone D1",
    floor: 4,
    capacity: 10,
    available: 10,
    price: 30,
    status: 2,
    dateUpdated: {
      $date: "2026-09-14T06:55:04.068Z",
    },
  },
  {
    _id: {
      $oid: "6aa795d3d5cc804d38f4d670",
    },
    id: "D2",
    name: "Zone D2",
    floor: 4,
    capacity: 10,
    available: 10,
    price: 30,
    status: 2,
    dateUpdated: {
      $date: "2026-09-14T06:54:28.073Z",
    },
  },
];

export default function HomePage() {
  const [tickets, setTickets] = React.useState<Zone[]>([]);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Zone | null>(null);
  const [hovered, setHovered] = React.useState<string | null>(null);

  React.useEffect(() => {
    const zones: Zone[] = data.map((item) => ({
      _id: item._id?.$oid,
      id: item.id,
      name: item.name,
      floor: item.floor,
      capacity: item.capacity,
      available: item.available,
      price: item.price,
      status: item.status,
      dateUpdated: item.dateUpdated?.$date,
    }));

    setTickets(zones);
  }, []);

  const handlePointerOver = (e: React.PointerEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    const group = target.closest("g[id]") as SVGGElement | null;
    if (group && group.id) {
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

    if (!group?.id) return;

    const zone = tickets.find((z) => z.id === group.id);

    if (!zone) return;

    setItems(zone);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col relative overflow-hidden pt-[96px] pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-[#ff3b30]/15 via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10 flex flex-col gap-6">
        <div className="w-full bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black backdrop-blur-2xl rounded-3xl border border-zinc-800/90 p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff3b30]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/[0.04] via-transparent to-transparent pointer-events-none" />
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
            handlePointerOver={handlePointerOver}
            handlePointerOut={handlePointerOut}
          />

          <Booking isOpen={open} items={items} onClose={() => setOpen(false)} />

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
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-zinc-950/60 rounded-xl p-3 border border-zinc-800/60"
                >
                  <div
                    className="w-4 h-4 rounded-md shadow-sm shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-zinc-400 truncate">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
