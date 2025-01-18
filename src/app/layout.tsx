import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/components/providers/query-provider";
import { validateRequest } from "./(auth)/auth-actions";
import SessionProvider from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create FWS Stack App",
  description: "Generated by create-fws-stack",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProviders>
          <SessionProvider value={session}>
            {children}
          </SessionProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
