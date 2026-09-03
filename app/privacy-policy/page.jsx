import LegalPage from "@/components/LegalPage";
import { contactEmail } from "@/lib/site";

export const metadata = {
  title: "Privacy policy | Mappy Global Resources",
  description:
    "How Mappy Global Resources collects, uses, shares, and protects personal information from clients, candidates, and website visitors."
};

const sections = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: [
      "Mappy Global Resources is a global recruitment agency providing executive search, specialist and niche recruitment, RPO and staffing support, and hiring support for expansions and transactions. We operate from Mumbai, India and Dubai, UAE.",
      `This policy explains what personal information we collect through this website and in the course of our recruitment work, how we use it, and the choices you have. Questions can be sent to ${contactEmail}.`
    ]
  },
  {
    id: "information-we-collect",
    heading: "Information we collect",
    body: [
      "We collect information you give us directly, and a limited amount of technical information collected automatically when you browse the site.",
      [
        "Enquiry details you submit through our contact form: your name, email address, contact number, industry, location, and the service you are enquiring about.",
        "Candidate information you share with us: your CV, work history, qualifications, current and expected compensation, notice period, and references.",
        "Client information: the contact details of the people we work with at client organisations, and the details of the roles being recruited.",
        "Correspondence: emails, messages, and notes from calls and meetings relating to a search.",
        "Technical information: IP address, browser type, pages viewed, and similar data generated automatically when you visit the site."
      ]
    ]
  },
  {
    id: "how-we-use-it",
    heading: "How we use your information",
    body: [
      "We use personal information to provide recruitment services and to run our business.",
      [
        "To respond to enquiries submitted through the site and to contact you about them.",
        "To assess candidate suitability for live mandates and to present shortlists to clients.",
        "To keep you informed about relevant opportunities where you have asked us to.",
        "To manage our relationship with clients, including contracting and invoicing.",
        "To maintain and improve the website and keep it secure.",
        "To comply with legal, regulatory, and contractual obligations."
      ]
    ]
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    body: [
      "We share candidate information with client organisations only in connection with a specific role, and we tell candidates which organisation their details are being shared with before we do so.",
      "We also share information with service providers who support our operations — for example, hosting, email, and applicant-tracking providers — under agreements that limit their use of the information to providing those services. We do not sell personal information."
    ]
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: [
      "We keep personal information for as long as it is needed for the purpose it was collected for, and for as long as we may reasonably need it for future opportunities, unless you ask us to remove it.",
      "Where information is no longer needed, we delete it or anonymise it. Records we are required to keep for legal, tax, or contractual reasons are retained for the period those obligations require."
    ]
  },
  {
    id: "security",
    heading: "How we protect it",
    body: [
      "We use appropriate technical and organisational measures to protect personal information against loss, misuse, and unauthorised access or disclosure, and we limit access to those who need it to do their work.",
      "No method of transmission or storage is completely secure. If you believe your information has been compromised, contact us at " +
        contactEmail +
        " so we can investigate."
    ]
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "Depending on where you are located, you may have rights over the personal information we hold about you.",
      [
        "Ask for a copy of the information we hold about you.",
        "Ask us to correct information that is inaccurate or incomplete.",
        "Ask us to delete information where there is no ongoing reason for us to keep it.",
        "Object to, or ask us to restrict, particular uses of your information.",
        "Withdraw consent where our use of your information relies on it."
      ],
      `To exercise any of these, write to ${contactEmail}. We may need to verify your identity before we act on a request.`
    ]
  },
  {
    id: "cookies",
    heading: "Cookies and analytics",
    body: [
      "This website uses only the cookies necessary to serve pages and keep the site functioning. If we add analytics or marketing cookies in future, we will update this policy and, where required, ask for your consent first.",
      "Most browsers let you refuse or delete cookies through their settings."
    ]
  },
  {
    id: "international",
    heading: "International transfers",
    body: [
      "We work on cross-border mandates, so personal information may be transferred to and accessed from countries other than the one in which it was provided — including India and the United Arab Emirates, where our offices are located.",
      "Where we transfer information internationally, we take steps to ensure it remains protected to the standard described in this policy."
    ]
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time to reflect changes in our practices or in the law. The date at the top of this page shows when it was last revised. Material changes will be highlighted on this page."
    ]
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      `For any question about this policy or about how we handle personal information, write to ${contactEmail} or use the enquiry form on our contact page.`
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy."
      intro="How we collect, use, share, and protect the personal information of clients, candidates, and visitors to this website."
      updated="3 September 2026"
      sections={sections}
    />
  );
}
