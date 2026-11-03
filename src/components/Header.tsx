"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { site } from "@/lib/site";

const navLinks: Array<{ href: string; label: string; badge?: string; children?: Array<{ href: string; label: string }> }> = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  {
    href: "/places",
    label: "Places",
    children: [
      { href: "/places/kashi-vishwanath-temple", label: "Kashi Vishwanath Temple" },
      { href: "/places/sankat-mochan-temple", label: "Sankat Mochan Temple" },
    ],
  },
  { href: "/homestay", label: "Homestay", badge: "New" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-maroon/10 bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className="relative inline-flex items-center gap-1 text-sm font-medium text-ink/80 transition-colors hover:text-saffron"
                aria-haspopup={link.children ? "true" : undefined}
              >
                {link.label}
                {link.children && <span aria-hidden="true" className="text-[10px]">▾</span>}
                {link.badge && (
                  <span className="absolute -right-6 -top-3 animate-pulse rounded-full bg-saffron px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
              {link.children && (
                <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-xl border border-maroon/10 bg-cream p-2 shadow-card">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block rounded-lg px-4 py-3 text-sm text-ink/80 transition-colors hover:bg-sand hover:text-maroon">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn-primary">
            Plan My Yatra
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-maroon/20 text-maroon md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-maroon/10 bg-cream md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-ink/80 hover:bg-sand hover:text-saffron"
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold uppercase text-white">{link.badge}</span>
                  )}
                </Link>
                {link.children && (
                  <div className="ml-4 flex flex-col border-l border-maroon/10 pl-3">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-ink/70 hover:bg-sand hover:text-maroon">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href={site.phoneHref} className="btn-outline mt-2 w-full">
              Call {site.phone}
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              Plan My Yatra
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
