import Link from "next/link";

import { Globe2 } from "@/components/icons";
import { btnOutlineLight, offices } from "@/lib/site";

export default function GlobalReach({ id = "reach" }) {
  return (
    <section id={id} data-section className="bg-[#2c3272] py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div data-section-heading>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb48c]">Global reach</p>
            <h2 className="mt-5 max-w-[16ch] font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] lg:text-[3.25rem]">
              Hiring access across regions, sectors, and time zones.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/70 sm:text-lg">
              Two hubs, one delivery team. Consultants sit in the markets they recruit in and work the same mandates
              from both ends — so briefs move forward while one side of the world sleeps.
            </p>

            <Link href="/contact" className={`${btnOutlineLight} mt-9`}>
              Talk to a consultant
            </Link>
          </div>

          <div data-reveal-group className="grid gap-px self-start bg-white/20">
            {offices.map(({ region, city, hours }) => (
              <div key={city} className="bg-[#2c3272] p-8 sm:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffb48c]">{region}</p>
                    <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{city}</p>
                  </div>
                  <Globe2 className="h-7 w-7 shrink-0 text-white/40" />
                </div>
                <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-7 text-white/70">{hours}</p>
              </div>
            ))}

            <div className="bg-[#2c3272] px-8 py-6 sm:px-10">
              <Link
                href="/contact#offices"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:text-[#ffb48c]"
              >
                See full office details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
