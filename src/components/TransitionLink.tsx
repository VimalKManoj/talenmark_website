"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** A Link that plays the curtain transition before navigating. */
export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const { navigate } = usePageTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={onClick}
      onNavigate={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
