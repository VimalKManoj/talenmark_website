import { useId } from "react";

/** The Talenmark mark: a red disc with the "T" cut out of it. */
export function LogoMark({ className, color = "#D31F31" }: { className?: string; color?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <mask id={`tm-${id}`}>
          <rect width="100" height="100" fill="#fff" />
          <path
            d="M11 41.2H89V43.2C74 46 62 48.6 56.2 52.6L54.4 101H45.6L43.8 52.6C38 48.6 26 46 11 43.2Z"
            fill="#000"
          />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="50" fill={color} mask={`url(#tm-${id})`} />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-sans font-semibold tracking-[0.22em] ${className ?? ""}`}>TALENMARK</span>
  );
}
