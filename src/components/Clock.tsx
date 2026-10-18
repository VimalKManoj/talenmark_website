"use client";

import { useEffect, useRef } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

/** Live Calicut time. Written straight to the DOM so SSR markup never mismatches. */
export default function Clock({ className, seconds = false }: { className?: string; seconds?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const t = fmt();
      ref.current.textContent = seconds ? t : t.slice(0, 5);
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [seconds]);
  return (
    <span ref={ref} className={`nums ${className ?? ""}`} suppressHydrationWarning>
      --:--
    </span>
  );
}
