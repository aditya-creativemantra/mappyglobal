import LegalPage from "@/components/LegalPage";
import { contactEmail } from "@/lib/site";

export const metadata = {
  title: "Terms and conditions | Mappy Global Resources",
  description:
    "The terms that govern use of the Mappy Global Resources website, enquiries submitted through it, and the information published on it."
};

const sections = [
  {
    id: "about-these-terms",
    heading: "About these terms",
    body: [
      "These terms govern your use of the Mappy Global Resources website. By browsing the site or submitting an enquiry through it, you accept these terms. If you do not accept them, please do not use the site.",
      "These terms cover the website only. Recruitment services are provided under a separate written agreement between Mappy Global Resources and the client, and that agreement takes precedence over anything on this site."
    ]
  },
  {
    id: "use-of-the-site",
    heading: "Use of the site",
    body: [
      "You may use this site for legitimate business purposes — learning about our services, and contacting us about hiring needs or opportunities.",
      "You agree not to:",
      [
        "Use the site in any way that breaches applicable law or regulation.",
        "Submit false, misleading, or fraudulent information through our forms.",
        "Attempt to gain unauthorised access to the site, its servers, or any connected system.",
        "Introduce malicious code, or interfere with the site's operation or availability.",
        "Extract, scrape, or systematically collect content from the site for commercial purposes without our written permission."
      ]
    ]
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: [
      "The content of this site — text, layout, graphics, logos, and the Mappy Global Resources name and marks — belongs to Mappy Global Resources or its licensors and is protected by applicable intellectual property law.",
      "You may view and print pages for your own reference. You may not reproduce, republish, or use our content for commercial purposes without our written permission."
    ]
  },
  {
    id: "enquiries",
    heading: "Enquiries and submissions",
    body: [
      "When you submit an enquiry, you confirm that the information you provide is accurate and that you are entitled to share it with us. If you send us information about someone else, you confirm you have their permission to do so.",
      "Submitting an enquiry, a CV, or a role brief does not create a contract between us, and does not oblige us to take on a mandate or to consider a candidate for any particular role.",
      "Information you submit is handled in line with our privacy policy."
    ]
  },
  {
    id: "no-guarantee",
    heading: "No guarantee of outcome",
    body: [
      "Recruitment outcomes depend on many factors outside our control, including candidate decisions and client requirements. Nothing on this site is a promise or guarantee that a role will be filled, that a candidate will be placed, or that a search will be completed within any particular timeframe.",
      "Descriptions of our services on this site are for information. The scope, fees, and terms of any engagement are set out in the agreement signed for that engagement."
    ]
  },
  {
    id: "third-party-links",
    heading: "Third-party links",
    body: [
      "This site may link to third-party websites, including social media profiles. We provide those links for convenience and do not control or endorse the content, policies, or practices of sites we do not operate. Visiting them is at your own risk."
    ]
  },
  {
    id: "availability",
    heading: "Availability and accuracy",
    body: [
      "We aim to keep the site available and its content accurate and current, but we do not guarantee uninterrupted availability or that every detail is free from error or omission.",
      "We may change, suspend, or withdraw any part of the site at any time without notice."
    ]
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Mappy Global Resources is not liable for any indirect or consequential loss, or for loss of profits, revenue, business, goodwill, or data, arising from your use of, or inability to use, this site or from reliance on its content.",
      "Nothing in these terms excludes or limits liability that cannot be excluded or limited under applicable law."
    ]
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: [
      "These terms and any dispute arising from them or from your use of this site are governed by the laws of India, and the courts of Mumbai have exclusive jurisdiction over such disputes."
    ]
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last revised, and continued use of the site after a change means you accept the revised terms."
    ]
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      `For any question about these terms, write to ${contactEmail} or use the enquiry form on our contact page.`
    ]
  }
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and conditions."
      intro="The terms that govern use of this website, the enquiries submitted through it, and the information published on it."
      updated="3 September 2026"
      sections={sections}
    />
  );
}
