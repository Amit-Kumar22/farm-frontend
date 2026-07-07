import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import config from "@/config";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: `${config.siteName} — Quality Trust, Direct to the Farm`,
  description:
    "MainFarm grows and sells fresh fish, dairy, vegetables and mushrooms straight from our own farms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
