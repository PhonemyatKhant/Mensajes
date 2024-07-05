import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import ActiveStatus from "@/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mensajes",
  description: "Messaging app created with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className=" h-full">
            {" "}
            <ActiveStatus />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
