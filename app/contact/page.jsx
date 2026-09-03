import Link from "next/link";

import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contactEmail, eyebrowClass, offices, socialLinks } from "@/lib/site";

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
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.6A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z" />
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

      <main>
        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <p className={eyebrowClass}>Contact us</p>
            <h1 className="mt-6 max-w-3xl font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] sm:text-6xl lg:text-[4.25rem]">
              Get in touch.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4a5170]">
              Connecting you with the right Mappy consultant is our priority. Tell us what you are hiring for and we
              will respond within one business day.
            </p>
          </div>
        </section>

        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
            <div className="grid gap-px border border-[#dcdfeb] bg-[#dcdfeb] md:grid-cols-2 xl:grid-cols-3">
              {quickLinks.map(({ title, description, action, href, icon: Icon }) => (
                <a key={title} href={href} className="group bg-white p-8 transition-colors hover:bg-[#fdf7f3]">
                  <Icon className="h-8 w-8 text-[#ed6929]" />
                  <h2 className="mt-6 text-xl font-semibold leading-snug text-[#2c3272]">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#4a5170]">{description}</p>
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
              <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-5xl">
                Tell us about your hiring need.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#4a5170]">
                Every enquiry is read by a consultant who works your market. Share as much detail as you can about the
                role, the industry, and where the team sits.
              </p>

              <dl className="mt-10 space-y-6 border-t border-[#dcdfeb] pt-8">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#2c3272]">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="break-words text-[15px] text-[#4a5170] underline underline-offset-4 transition-colors hover:text-[#ed6929]"
                    >
                      {contactEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#2c3272]">Follow</dt>
                  <dd className="mt-2 flex flex-wrap gap-5">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[15px] text-[#4a5170] underline underline-offset-4 transition-colors hover:text-[#ed6929]"
                      >
                        {social.label}
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
            <h2 className="mt-5 max-w-3xl font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-5xl">
              Where you will find us.
            </h2>

            <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
              {offices.map((office) => (
                <div key={office.city} className="border-t-2 border-[#2c3272] pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ed6929]">{office.region}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#2c3272]">{office.city}</h3>
                  <p className="mt-4 text-[15px] leading-7 text-[#4a5170]">{office.address}</p>
                  <p className="mt-4 text-sm leading-6 text-[#6c7290]">{office.hours}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-[#dcdfeb] pt-10">
              <p className="text-base leading-8 text-[#4a5170]">
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

      <SiteFooter />
    </div>
  );
}
