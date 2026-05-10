import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { GlobalCursor } from "@/components/shared/GlobalCursor";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mall of America | More Than A Mall",
  description: "A Global Destination Platform. Retail. Entertainment. Culture. Partnerships.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-black text-white selection:bg-white selection:text-black`}>
        <SmoothScrollProvider>
          <GlobalCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
