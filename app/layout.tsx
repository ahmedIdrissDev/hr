import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Provider from "@/hooks/useAuth";


import { ClerkProvider } from '@clerk/nextjs'
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

  return (
    
    <html lang="en">
      <body
        className={inter.className}
        >
          <Provider>

                  <ClerkProvider>
        {children}
</ClerkProvider>
          </Provider>
    
      </body>
    </html>
  );
}
