import type { Metadata } from "next";
import { Yantramanav } from "next/font/google";
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
    <html lang="nl">
      <body className={`${font.className}`} id="body">
        {children}
      </body>
    </html>
  );
}
