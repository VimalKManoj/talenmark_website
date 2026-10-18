"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, onIntroReady } from "@/lib/stage";
import { contact, images, redCrop } from "@/lib/content";
import { LogoMark, Wordmark } from "@/components/Logo";
import TransitionLink from "@/components/TransitionLink";
import { usePageTransition } from "@/components/providers/TransitionProvider";
import Clock from "@/components/Clock";

const menuLinks = [
  { href: "/", index: "00", label: "The Group", note: "Talenmark, since 2014", image: images.culturalCentreRed },
  { href: "/real-estate", index: "01", label: "Structure", note: "Real Estate, Construction & Township", image: images.culturalCentre },
  { href: "/hospitality", index: "02", label: "Sanctuary", note: "Hospitality — Chilgrove, Wayanad", image: images.chilgroveAerial },
  { href: "#contact", index: "03", label: "Contact", note: "Calicut, Kerala", image: images.chilgroveVilla },
];

export default function Nav() {
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Entrance after the loader, then hide on scroll down / show on scroll up.
  useGSAP(() => {
    const els = [bar.current, mark.current];
    gsap.set(els, { y: -110 });
    const off = onIntroReady(() => gsap.to(els, { y: 0, duration: 1.4, delay: 0.6, ease: "expo.out" }));

    let last = 0;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const shouldHide = y > last && y > 140;
      if (shouldHide !== hidden) {
        hidden = shouldHide;
        gsap.to(els, { y: hidden ? -110 : 0, duration: 0.8, ease: "expo.out", overwrite: "auto" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
    };
  });

  // Menu open / close.
  useGSAP(
    () => {
      const el = menu.current!;
      if (first.current) {
        first.current = false;
        gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 0 });
        return;
      }
      if (open) {
        getLenis()?.stop();
        gsap
          .timeline()
          .set(el, { autoAlpha: 1 })
          .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" })
          .fromTo(".menu-word", { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 1.1 }, 0.45)
          .fromTo(".menu-fade", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.9 }, 0.6);
      } else {
        getLenis()?.start();
        gsap
          .timeline()
          .to(".menu-word", { yPercent: -110, stagger: 0.03, duration: 0.5, ease: "power3.in" })
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" }, 0.2)
          .set(el, { autoAlpha: 0 });
      }
    },
    { scope: menu, dependencies: [open] },
  );

  // Close the menu whenever the route actually changes.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 0 });
    setOpen(false);
  }, [pathname]);

  const onMenuLink = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      setOpen(false);
      window.setTimeout(() => getLenis()?.scrollTo(href, { duration: 1.8 }), 700);
      return;
    }
    if (href === pathname) {
      setOpen(false);
      getLenis()?.scrollTo(0, { duration: 1.4 });
      return;
    }
    navigate(href);
  };

  return (
    <>
      {/* Brand mark keeps its colour, so it lives outside the blended bar. */}
      <div ref={mark} className="fixed left-5 top-5 z-[61] md:left-8 md:top-7">
        <TransitionLink href="/" aria-label="Talenmark — home" className="block">
          <LogoMark className="h-8 w-8" />
        </TransitionLink>
      </div>

      <div
        ref={bar}
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-5 pt-5 text-white mix-blend-difference md:px-8 md:pt-7"
      >
        <TransitionLink href="/" className="pointer-events-auto flex h-8 items-center pl-11 text-[0.72rem]">
          <Wordmark />
        </TransitionLink>

        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-[0.8rem] md:flex">
          <TransitionLink href="/real-estate" className="group flex items-baseline gap-2">
            <span className="eyebrow opacity-50">01</span>
            <span className="link-underline">Structure</span>
            {pathname === "/real-estate" && <span className="h-1 w-1 rounded-full bg-current" />}
          </TransitionLink>
          <span className="h-3 w-px bg-current opacity-40" />
          <TransitionLink href="/hospitality" className="group flex items-baseline gap-2">
            <span className="eyebrow opacity-50">02</span>
            <span className="link-underline">Sanctuary</span>
            {pathname === "/hospitality" && <span className="h-1 w-1 rounded-full bg-current" />}
          </TransitionLink>
        </nav>

        <div className="pointer-events-auto flex items-center gap-8">
          <span className="eyebrow hidden opacity-60 lg:inline">
            Calicut <Clock />
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="group flex items-center gap-3 text-[0.8rem]"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span className="relative block h-4 w-[3.2rem] overflow-hidden text-right">
              <span
                className="absolute right-0 top-0 transition-transform duration-700 ease-[var(--ease-expo)]"
                style={{ transform: open ? "translateY(-100%)" : "translateY(0)" }}
              >
                Menu
              </span>
              <span
                className="absolute right-0 top-0 transition-transform duration-700 ease-[var(--ease-expo)]"
                style={{ transform: open ? "translateY(0)" : "translateY(100%)" }}
              >
                Close
              </span>
            </span>
            <span className="relative block h-3 w-6">
              <span
                className="absolute left-0 top-0.5 h-px w-full bg-current transition-transform duration-700 ease-[var(--ease-expo)]"
                style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }}
              />
              <span
                className="absolute bottom-0.5 left-0 h-px w-full bg-current transition-transform duration-700 ease-[var(--ease-expo)]"
                style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        ref={menu}
        className="invisible fixed inset-0 z-[55] bg-ink text-bone"
        data-lenis-prevent
      >
        <div className="grid h-full grid-cols-1 gap-10 px-5 pb-8 pt-28 md:grid-cols-12 md:px-8 md:pt-32">
          <ul className="flex flex-col justify-center md:col-span-7">
            {menuLinks.map((l, i) => (
              <li key={l.href} className="border-b border-bone/10 first:border-t">
                <a
                  href={l.href}
                  onClick={onMenuLink(l.href)}
                  onMouseEnter={() => setHovered(i)}
                  className="group flex items-baseline gap-5 py-3 md:py-4"
                >
                  <span className="menu-fade eyebrow w-8 text-bone/40">{l.index}</span>
                  <span className="mask">
                    <span className="menu-word display inline-block text-[13vw] leading-[0.95] transition-[font-style,transform] duration-500 group-hover:translate-x-3 group-hover:italic md:text-[5.6vw]">
                      {l.label}
                    </span>
                  </span>
                  <span className="menu-fade eyebrow ml-auto hidden text-bone/40 lg:inline">{l.note}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative hidden overflow-hidden rounded-sm md:col-span-5 md:block">
            {menuLinks.map((l, i) => (
              <div
                key={l.href}
                className="absolute inset-0 overflow-hidden transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-expo)]"
                style={{ opacity: hovered === i ? 1 : 0, transform: hovered === i ? "scale(1)" : "scale(1.12)" }}
              >
                <Image
                  src={l.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 90vw, 100vw"
                  className="object-cover"
                  style={l.image === images.culturalCentreRed ? redCrop : undefined}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>

          <div className="menu-fade flex flex-wrap items-end justify-between gap-6 text-sm text-bone/60 md:col-span-12">
            <p>
              {contact.address[0]}, {contact.address[1]}
            </p>
            <div className="flex gap-8">
              <a href={contact.phoneHref} className="link-underline">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="link-underline">
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
