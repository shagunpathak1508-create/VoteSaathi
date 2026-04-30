import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/shared/ClientProviders";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
