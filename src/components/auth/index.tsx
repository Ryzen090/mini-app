"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function AuthContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) return;

    localStorage.setItem("token", token);

    window.dispatchEvent(new Event("auth-changed"));

    const url = new URL(window.location.href);
    url.searchParams.delete("token");

    window.history.replaceState({}, "", url.pathname);
  }, [searchParams]);

  return null;
}

export default function Auth() {
  return (
    <Suspense fallback={null}>
      <AuthContent />
    </Suspense>
  );
}
