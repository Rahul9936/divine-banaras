"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
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
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-saffron"
            >
              {link.label}
            </Link>
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink/80 hover:bg-sand hover:text-saffron"
              >
                {link.label}
              </Link>
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
