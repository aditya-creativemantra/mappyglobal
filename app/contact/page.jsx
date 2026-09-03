import Image from "next/image";
import Link from "next/link";

import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import PageMotion from "@/components/PageMotion";
import SiteHeader from "@/components/SiteHeader";
import { btnOutline, btnPrimary, contactEmail, eyebrowClass, offices, socialLinks } from "@/lib/site";

export const metadata = {
  title: "Contact us | Mappy Global Resources",
  description:
    "Get in touch with Mappy Global Resources. Send an enquiry, email the team, or find our offices in Mumbai and Dubai."
};

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.8-.9L3.5 20.5l1.4-4.7a8.4 8.4 0 0 1-1.4-4.3 8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5Z" />
    </svg>
  );
}

const quickLinks = [
  {
    title: "Send us an email",
    description: "Write to the team directly and we will route your enquiry to the right consultant.",
    action: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: MailIcon
  },
  {
    title: "Find a local office",
    description: "Offices and consultant networks across India and the Middle East.",
    action: "See our offices",
    href: "#offices",
    icon: PinIcon
  },
  {
    title: "Media enquiries",
    description: "For press, partnership, or speaking requests, reach us on the same address.",
    action: "Email the team",
    href: `mailto:${contactEmail}?subject=Media%20enquiry`,
    icon: ChatIcon
  }
];

export default function ContactPage() {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <PageMotion>
        <main>
          {/* Banner */}
          <section className="border-b border-[#dcdfeb] bg-white">
            <div className="grid lg:grid-cols-2">
              <div className="relative order-1 min-h-[320px] overflow-hidden sm:min-h-[420px] lg:order-2 lg:min-h-[560px]">
                <Image
                  src="/contact-us.jpg"
                  alt="Mappy Global Resources consultants ready to talk"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[58%_center]"
                />
              </div>

              <div className="order-2 bg-[#e3e6f5] px-6 py-16 sm:px-12 lg:order-1 lg:flex lg:items-center lg:px-16 lg:py-20">
                <div className="w-full max-w-xl">
                  <p className={eyebrowClass}>Contact us</p>
                  <h1 className="mt-6 font-display text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#2c3272] sm:text-[2.9rem] lg:text-[3.4rem]">
                    Get in touch.
                  </h1>
                  <p className="mt-7 text-lg leading-8 text-[#2c3272]">
                    Connecting you with the right Mappy consultant is our priority. Tell us what you are hiring for and
                    we will respond within one business day.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <a href="#enquiry" className={btnPrimary}>
                      Send an enquiry
                    </a>
                    <a href="#offices" className={btnOutline}>
                      Our offices
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#dcdfeb] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
              <div className="grid gap-px border border-[#dcdfeb] bg-[#dcdfeb] md:grid-cols-2 xl:grid-cols-3">
                {quickLinks.map(({ title, description, action, href, icon: Icon }) => (
                  <a key={title} href={href} className="group bg-white p-8 transition-colors hover:bg-[#fdf7f3]">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f6cdb6] bg-white shadow-[0_10px_26px_rgba(237,105,41,0.22)] transition-shadow duration-300 group-hover:shadow-[0_14px_32px_rgba(237,105,41,0.34)]">
                      <Icon className="h-7 w-7 text-[#ed6929]" />
                    </span>
                    <h2 className="mt-6 text-xl font-semibold leading-snug text-[#2c3272]">{title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#2c3272]">{description}</p>
                    <span className="mt-5 inline-block break-words text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] underline underline-offset-4 transition-colors group-hover:text-[#ed6929]">
                      {action}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="enquiry" className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-8">
              <div>
                <p className={eyebrowClass}>Enquiry form</p>
                <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] lg:text-5xl">
                  Tell us about your hiring need.
                </h2>
                <p className="mt-6 text-base leading-8 text-[#2c3272]">
                  Every enquiry is read by a consultant who works your market. Share as much detail as you can about the
                  role, the industry, and where the team sits.
                </p>

                <dl className="mt-10 space-y-6 border-t border-[#dcdfeb] pt-8">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#2c3272]">Email</dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="break-words text-[15px] text-[#2c3272] underline underline-offset-4 transition-colors hover:text-[#ed6929]"
                      >
                        {contactEmail}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#2c3272]">Follow</dt>
                    <dd className="mt-4 flex flex-wrap gap-4">
                      {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={label}
                          title={label}
                          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f6cdb6] bg-white text-[#ed6929] shadow-[0_10px_26px_rgba(237,105,41,0.22)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(237,105,41,0.34)]"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border border-[#dcdfeb] bg-white p-8 sm:p-10">
                <ContactForm />
              </div>
            </div>
          </section>

          <section id="offices" className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className={eyebrowClass}>Our offices</p>
              <h2 className="mt-5 max-w-3xl font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] lg:text-5xl">
                Where you will find us.
              </h2>

              <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
                {offices.map((office) => (
                  <div key={office.city} className="border-t-2 border-[#2c3272] pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ed6929]">{office.region}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[#2c3272]">{office.city}</h3>
                    <p className="mt-4 text-[15px] leading-7 text-[#2c3272]">{office.address}</p>
                    <p className="mt-4 text-sm leading-6 text-[#6c7290]">{office.hours}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 border-t border-[#dcdfeb] pt-10">
                <p className="text-base leading-8 text-[#2c3272]">
                  Looking for a role rather than hiring?{" "}
                  <Link href="/services" className="text-[#2c3272] underline underline-offset-4 hover:text-[#ed6929]">
                    See how we work with candidates
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        </main>
      </PageMotion>

      <SiteFooter />
    </div>
  );
}
