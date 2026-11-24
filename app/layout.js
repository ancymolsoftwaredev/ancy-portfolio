import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
const display = Fraunces({ subsets: ["latin"], variable: "--display" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--body" });
export const metadata = {
  title: "Ancymol KK — AI Automation & Full Stack Developer, Dubai",
  description: "Lead CRMs, WhatsApp automation, e-commerce and inventory systems for real estate and retail in the UAE, Australia and Qatar.",
  icons: { icon: "/profile.webp" },
};
export default function RootLayout({ children }) {
  return (<html lang="en"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>);
}
