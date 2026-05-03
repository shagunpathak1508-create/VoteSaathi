import type { Metadata } from "next";
import { Inter, Rajdhani, Fira_Code } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/shared/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VoteSaathi – Your Election Companion | India",
  description:
    "Your smart election companion for India. Understand voting, registration, results, and more — step by step.",
  keywords:
    "India election, voter registration, how to vote India, Form 6, voter ID, election results, VoteSaathi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rajdhani.variable} ${firaCode.variable}`}
    >
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
