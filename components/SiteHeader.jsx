"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation } from "@/lib/site";

function ChevronDown(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function GridDots(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="5" cy="5" r="1.6" />
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="19" cy="5" r="1.6" />
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
      <circle cx="5" cy="19" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
      <circle cx="19" cy="19" r="1.6" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeMenu = navigation.find((item) => item.label === openMenu && item.columns);

  // The nav item for the page you are on gets the same colour as hover.
  const isCurrent = (href) => {
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header data-header className="sticky top-0 z-50 bg-white">
      <div className="relative border-b border-[#dcdfeb] bg-white" onMouseLeave={() => setOpenMenu(null)}>
        <div className="relative mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-6 sm:h-[88px] lg:h-[100px] lg:gap-6 lg:px-8">
          <Link href="/" onClick={closeAll} className="flex items-center">
            <Image
              src="/brand/mappy-logo.png"
              alt="Mappy Global Resources logo"
              width={1179}
              height={211}
              className="h-9 w-auto sm:h-11 lg:h-12"
              priority
            />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex">
            {navigation.map((item) =>
              item.columns ? (
                <button
                  key={item.label}
                  type="button"
                  aria-expanded={openMenu === item.label}
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onClick={() => setOpenMenu((value) => (value === item.label ? null : item.label))}
                  className={`flex items-center gap-1.5 border px-3 py-2 text-[18px] font-medium transition-colors ${
                    openMenu === item.label
                      ? "border-[#ed6929] text-[#ed6929]"
                      : `border-transparent hover:text-[#ed6929] ${
                          isCurrent(item.href) ? "text-[#ed6929]" : "text-[#2c3272]"
                        }`
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`h-3 w-3 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setOpenMenu(null)}
                  onClick={closeAll}
                  className={`border border-transparent px-3 py-2 text-[18px] font-medium transition-colors hover:text-[#ed6929] ${
                    isCurrent(item.href) ? "text-[#ed6929]" : "text-[#2c3272]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <Link
            href="/contact"
            onClick={closeAll}
            className="ml-auto hidden items-center cta-glow border border-[#ed6929] bg-[#ed6929] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#d85f21] hover:bg-[#d85f21] xl:inline-flex"
          >
            Contact us
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="ml-auto inline-flex h-11 w-11 items-center justify-center border border-[#dcdfeb] text-[#2c3272] transition-colors hover:border-[#2c3272] xl:hidden"
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {activeMenu ? (
          <div className="absolute inset-x-0 top-full hidden border-b border-[#dcdfeb] bg-white shadow-[0_20px_40px_-32px_rgba(22,32,74,0.5)] xl:block">
            <div className="mx-auto grid max-w-7xl grid-cols-3 gap-x-14 px-6 py-12 lg:px-8">
              {activeMenu.columns.map((column) => (
                <div key={column.title}>
                  <p className="border-b border-[#2c3272]/25 pb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#2c3272]">
                    {column.title}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className="text-[18px] leading-7 text-[#3d4468] transition-colors hover:text-[#ed6929]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {column.feature ? (
                    <Link
                      href={column.feature.href}
                      onClick={closeAll}
                      className="mt-7 inline-flex items-center gap-3 text-[18px] text-[#2c3272] transition-colors hover:text-[#ed6929]"
                    >
                      <GridDots className="h-4 w-4 text-[#ed6929]" />
                      {column.feature.label}
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain border-b border-[#dcdfeb] bg-white sm:max-h-[calc(100vh-88px)] xl:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
            {navigation.map((item) =>
              item.columns ? (
                <div key={item.label} className="border-b border-[#e8eaf3] py-1">
                  <button
                    type="button"
                    aria-expanded={mobileSection === item.label}
                    onClick={() => setMobileSection((value) => (value === item.label ? null : item.label))}
                    className={`flex w-full items-center justify-between py-3 text-left text-[18px] font-semibold ${
                      isCurrent(item.href) ? "text-[#ed6929]" : "text-[#2c3272]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`} />
                  </button>

                  {mobileSection === item.label ? (
                    <div className="pb-4">
                      {item.columns.map((column) => (
                        <div key={column.title} className="mt-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b93ab]">{column.title}</p>
                          <ul className="mt-3 space-y-3">
                            {column.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  onClick={closeAll}
                                  className="text-[15px] text-[#3d4468] transition-colors hover:text-[#ed6929]"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  className={`block border-b border-[#e8eaf3] py-4 text-[18px] font-semibold ${
                    isCurrent(item.href) ? "text-[#ed6929]" : "text-[#2c3272]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            <Link
              href="/contact"
              onClick={closeAll}
              className="mt-6 inline-flex w-full items-center justify-center cta-glow border border-[#ed6929] bg-[#ed6929] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#d85f21] hover:bg-[#d85f21]"
            >
              Contact us
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
