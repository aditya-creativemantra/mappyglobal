import Image from "next/image";
import Link from "next/link";

import CookieSettingsLink from "@/components/CookieSettingsLink";
import { contactEmail, footerColumns, legalLinks, socialLinks } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-[#2c3272] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Mappy Global Resources home" className="inline-block">
              <Image
                src="/brand/mappy-logo-white.png"
                alt="Mappy Global Resources logo"
                width={1179}
                height={211}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-6 text-sm leading-7 text-white/70">
              Partnering in your critical and niche talent needs with executive search, specialist recruitment, RPO
              support, and cross-border hiring capability.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-6 inline-block break-words text-sm text-white underline underline-offset-4 transition-colors hover:text-[#ffb48c]"
            >
              {contactEmail}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">{column.title}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
              <CookieSettingsLink className="text-sm text-white/60 transition-colors hover:text-white" />
            </div>
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} Mappy Global Resources. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white/75 transition-colors hover:border-white hover:bg-white hover:text-[#2c3272]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
