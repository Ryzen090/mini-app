"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getCurrentUser, logout } from "@/lib/auth";

type User = {
  googleId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  avatar?: string;
  photo?: string;
  image?: string;
};

export default function Header() {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GOOGLE}`;

  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        const currentUser = response?.user || response?.data || response;

        if (
          currentUser &&
          typeof currentUser === "object" &&
          Object.keys(currentUser).length > 0
        ) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to load current user:", error);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const avatarUrl = user?.picture || user?.avatar || user?.photo || user?.image;

  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : "Account";

  const userInitial =
    user?.firstName?.charAt(0) || user?.email?.charAt(0) || "U";

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

        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="group flex items-center rounded-full focus:outline-none"
              aria-label="User menu"
              aria-expanded={isDropdownOpen}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.firstName || "User"}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 cursor-pointer rounded-full border border-white/30 object-cover transition duration-300"
                />
              ) : (
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-bold uppercase transition duration-300 group-hover:border-[#ff3b30] group-hover:bg-[#ff3b30]">
                  {userInitial}
                </div>
              )}
            </button>

            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}

            {isDropdownOpen && (
              <div className="absolute right-0 z-50 mt-4 w-72 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                <div className="px-5 py-5">
                  <div className="flex items-center gap-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={user.firstName || "User"}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-full object-cover shadow-lg"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ff3b30]/60 bg-white/10 text-lg font-black uppercase">
                        {userInitial}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black uppercase tracking-wide">
                        {userName}
                      </p>

                      {user.email && (
                        <p className="mt-1 truncate text-xs text-white/40">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mx-4 h-px bg-white/10" />

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="group cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition duration-200 hover:bg-[#ff3b30]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff3b30]/10 text-[#ff3b30] transition group-hover:bg-white/10 group-hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 15l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-black uppercase tracking-widest">
                        Logout
                      </p>

                      <p className="mt-0.5 text-[10px] text-white/40 transition group-hover:text-white/60">
                        Sign out of your account
                      </p>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="border-t border-white/5 bg-white/[0.02] px-5 py-3">
                  <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">
                    PKRSR FOOTBALL CLUB
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <a
            href={API_URL}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-white transition-all duration-300 hover:border-[#ff3b30] hover:bg-[#ff3b30]"
            aria-label="Login"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
            >
              <circle cx="12" cy="7.5" r="3.5" />
              <path d="M4.5 21c.6-4.4 3.2-6.5 7.5-6.5s6.9 2.1 7.5 6.5H4.5Z" />
            </svg>
          </a>
        )}
      </div>
    </header>
  );
}
