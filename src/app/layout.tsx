import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/storeProvider";
import { Inter } from "next/font/google";
import Sidebar from "@/ui/SidebarComponent";

export const metadata: Metadata = {
  title: "NextJS BoilerPlate",
  description: "Plutus NextJS BoilerPlate for new NextJS projects",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <StoreProvider>
          <div className="flex h-full p-20">
            <Sidebar  />
            <main className="flex-1 ml-80 px-8 overflow-auto">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
