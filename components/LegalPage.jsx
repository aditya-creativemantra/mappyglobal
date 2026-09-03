import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { eyebrowClass } from "@/lib/site";

export default function LegalPage({ eyebrow, title, intro, updated, sections }) {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <main>
        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <p className={eyebrowClass}>{eyebrow}</p>
            <h1 className="mt-6 max-w-4xl font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] sm:text-6xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4a5170]">{intro}</p>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[#6c7290]">Last updated {updated}</p>
          </div>
        </section>

        <section className="bg-[#f4f5fc] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:px-8">
            <nav aria-label="On this page" className="lg:sticky lg:top-[124px] lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2c3272]">On this page</p>
              <ol className="mt-5 space-y-3 border-t border-[#dcdfeb] pt-5">
                {sections.map(({ id, heading }, index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="flex gap-3 text-[15px] leading-6 text-[#4a5170] transition-colors hover:text-[#ed6929]"
                    >
                      <span className="font-semibold text-[#ed6929]">{String(index + 1).padStart(2, "0")}</span>
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="divide-y divide-[#dcdfeb] border-t border-[#dcdfeb]">
              {sections.map(({ id, heading, body }) => (
                <section key={id} id={id} className="scroll-mt-[84px] lg:scroll-mt-[124px] py-10 first:pt-10">
                  <h2 className="text-2xl font-semibold leading-snug text-[#2c3272]">{heading}</h2>
                  <div className="mt-5 space-y-5">
                    {body.map((block, index) =>
                      Array.isArray(block) ? (
                        <ul key={index} className="space-y-3 border-l-2 border-[#ed6929] pl-6">
                          {block.map((item) => (
                            <li key={item} className="text-base leading-8 text-[#4a5170]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={index} className="text-base leading-8 text-[#4a5170]">
                          {block}
                        </p>
                      )
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
