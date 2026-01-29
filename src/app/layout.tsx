import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cdl-trip-guide.vercel.app"),
  title: "CDL Major I - Dallas Trip Guide",
  description:
    "Your pocket guide to CDL Major I in Dallas. Hotels, Uber prices, food spots, match schedule & more. Jan 29-Feb 1 at Moody Coliseum.",
  keywords: ["CDL", "Call of Duty League", "Major 1", "Dallas", "OpTic Texas", "esports", "Moody Coliseum", "trip guide"],
  authors: [{ name: "CDL Community" }],

  // Open Graph for Facebook sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cdl-trip-guide.vercel.app",
    siteName: "CDL Major I Trip Guide",
    title: "CDL Major I - Dallas Trip Guide 🎮",
    description: "Everything you need for CDL Major I: Hotels near venue, live Uber prices, food spots, match schedule. Built by fans, for fans.",
    images: [
      {
        url: "/cdl_major_dashboard.png",
        width: 1200,
        height: 630,
        alt: "CDL Major I Dallas Trip Guide",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "CDL Major I - Dallas Trip Guide 🎮",
    description: "Everything you need for CDL Major I: Hotels, Uber prices, food, schedule. Built by fans, for fans.",
    images: ["/cdl_major_dashboard.png"],
  },

  // PWA manifest
  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CDL Dallas",
  },

};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  themeColor: "#4a7c2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${roboto.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
