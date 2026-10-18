"use client";

import { getLenis } from "@/lib/stage";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => getLenis()?.scrollTo(0, { duration: 2.2 })}
      className="group flex items-center gap-3 text-left"
    >
      <span className="link-underline">Back to top</span>
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <path d="M8 14V2M3 7l5-5 5 5" />
      </svg>
    </button>
  );
}
