export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const inter = Manrope({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "Pesa",
  description: "Pesa is a modern banking platform for everyone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  const invested = user?.earnInterestEnabled;
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} ${
          invested ? "invested" : ""
        }`}
      >
        {children}
      </body>
    </html>
  );
}
