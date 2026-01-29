import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Provider from "@/hooks/useAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils";
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "tgcc Resources ",
  description: "tgcc Resources ",
  icons:'/icons/logo.svg'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SessionProvider =  await getServerSession(authOptions)

  return (
    
    <html lang="en">
      <body
        className={inter.className}
        >
      <Toaster
       position="top-center"
      style={
        {
          "--normal-bg": "var(--color-tgcc-50)",
          "--normal-text": "var(--color-tgcc-500)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      closeButton theme="light" />
      <Provider session={SessionProvider}>
        {children}
        </Provider>
      </body>
    </html>
  );
}
