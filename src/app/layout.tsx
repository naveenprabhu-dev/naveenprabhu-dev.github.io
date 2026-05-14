import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ThreeBackground from "@/components/ThreeBackground";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Naveen Prabhu | Portfolio",
  description: "Personal portfolio of Naveen Prabhu, BS/MS Student at UNC Chapel Hill.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-mono selection:bg-neon-mint selection:text-white">
        <LenisProvider>
          <ThreeBackground />
          {children}
          <div className="crt-overlay pointer-events-none" aria-hidden="true" />
        </LenisProvider>
      </body>
    </html>
  );
}
