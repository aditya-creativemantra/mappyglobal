import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import PageMotion from "@/components/PageMotion";
import SiteHeader from "@/components/SiteHeader";
import { btnOutline, btnPrimary, eyebrowClass } from "@/lib/site";

export const metadata = {
  title: "Thank you | Mappy Global Resources",
  description:
    "Thank you for contacting Mappy Global Resources. A consultant will be in touch about your hiring requirement shortly.",
  robots: { index: false, follow: true }
};

const nextSteps = [
  {
    number: "01",
    title: "We review your brief",
    description: "A consultant close to your market reads the requirement and the context behind it."
  },
  {
    number: "02",
    title: "We get in touch",
    description: "Expect a call or email within one business day to align on the role, timeline, and priorities."
  },
  {
    number: "03",
    title: "We start the search",
    description: "Once the brief is agreed, market mapping and candidate outreach begin straight away."
  }
];

export default function ThankYouPage() {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <PageMotion>
        <main>
          <section className="border-b border-[#dcdfeb] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <span className="inline-flex h-14 w-14 items-center justify-center bg-[#ed6929] text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>

              <p className={`mt-8 ${eyebrowClass}`}>Enquiry received</p>

              <h1 className="mt-6 max-w-3xl font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] lg:text-[4.25rem]">
                Thank you — your message is with us.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#2c3272]">
                A Mappy consultant will review your requirement and respond within one business day. If it is urgent,
                reply to the confirmation email and we will prioritise it.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/" className={btnPrimary}>
                  Back to homepage
                </Link>
                <Link href="/services" className={btnOutline}>
                  Explore our services
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-[#f4f5fc] py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className={eyebrowClass}>What happens next</p>
              <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
                {nextSteps.map(({ number, title, description }) => (
                  <div key={number} className="border-t border-[#dcdfeb] pt-6">
                    <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#ed6929]">{number}</p>
                    <h2 className="mt-5 text-xl font-semibold text-[#2c3272]">{title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[#2c3272]">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageMotion>

      <SiteFooter />
    </div>
  );
}
