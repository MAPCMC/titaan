import type { Metadata } from "next";
import { Yantramanav } from "next/font/google";
import ObserverProvider from "./_components/ObserverProvider";
import Script from "next/script";
import "./globals.css";

const font = Yantramanav({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Titaan Producties",
  description:
    "Fondsenwerving en advies binnen de culturele sector door Suzanne Kortbeek. Gevestigd in Utrecht.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ObserverProvider>
      <html lang="nl" className="text-sm md:text-base">
        <head>
          <Script
            defer
            src="https://analytics.maartenpeene.nl/script.js"
            data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID}
          />
          <meta name="apple-mobile-web-app-title" content="Titaan" />
        </head>
        <body
          className={`${font.className} flex min-h-screen flex-col`}
          id="body"
        >
          {children}
        </body>
      </html>
    </ObserverProvider>
  );
}
