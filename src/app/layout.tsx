import type { Metadata } from "next";
import { Dancing_Script, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deep Research",
  description:
    "An intelligent system that generates follow-up questions, crafts optimal search queries, and compiles comprehensive research reports.",
    icons:{
      icon:"/log.png"
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${dancingScript.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
