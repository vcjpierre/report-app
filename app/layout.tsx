import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

const roboto = Roboto({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "TrackReport",
  description: "Envie sus reportes de forma segura",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <div className="relative min-h-screen bg-black selection:bg-sky-500/20">
          {/* Gradient Background */}
          <div className="fixed inset-0 -z-10 min-h-screen">
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
          </div>
          <Navbar />
          <main className="pt-16">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
