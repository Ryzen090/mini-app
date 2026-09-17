"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black text-white">
      <div className="mx-auto flex h-[86px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group">
          <div className="text-3xl font-black italic tracking-[-0.1em] transition group-hover:text-[#ff3b30]">
            PKRSR
          </div>

          <div className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/40">
            FOOTBALL CLUB
          </div>
        </Link>

        <Link
          href="/basket"
          className="relative text-lg font-black uppercase italic transition hover:text-[#ff3b30]"
        >
          SHOP
          <span className="absolute -right-3 -top-1 h-2 w-2 rounded-full bg-[#ff3b30]" />
        </Link>

        <Link
          href="http://localhost:9000/api/v1/auth/google"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition hover:border-[#ff3b30] hover:bg-[#ff3b30]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
