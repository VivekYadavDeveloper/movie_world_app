import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/Layout/Navbar/navbar";
import Footer from "@/components/Layout/Footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
/* If Anuthing Common For every Screen Like Eg: Draw,
AppBar(navbar),Footer,Color,Fonts Always Use Layout Section From App*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie World",
  description: "Movie to watch next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased` }
      >
        <NavbarComponent />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
