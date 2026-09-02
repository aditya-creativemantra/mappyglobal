import "./globals.css";

export const metadata = {
  title: "Mappy Global Resources | Partnering in Your Critical and Niche Talent Needs",
  description:
    "Mappy Global Resources is a global recruitment agency delivering executive search, niche talent recruitment, RPO support, global expansion hiring, and M&A talent advisory across key international markets."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
