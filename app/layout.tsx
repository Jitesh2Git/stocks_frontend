import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./components/Theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoftStock – Market Insights from News Sentiment",
  description:
    "SoftStock analyzes news headlines to extract sentiment-driven market insights. Stay ahead with real-time data and informed stock predictions.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      dynamic
      afterSignOutUrl="/"
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const theme = localStorage.getItem("theme");
                    if (theme === "dark") {
                      document.documentElement.setAttribute("data-theme", "dark");
                    } else {
                      document.documentElement.removeAttribute("data-theme");
                    }
                  } catch(e) {}
                })();
              `,
            }}
          ></script>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body
          className={`
              ${geistSans.variable} ${geistMono.variable} 
              antialiased font-sans 
              not-dark:bg-gradient-to-br not-dark:from-blue-200 not-dark:to-blue-50 
              not-dark:text-black/80
              dark:bg-neutral-950 dark:text-white
            `}
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          <ThemeToggle />
        </body>
      </html>
    </ClerkProvider>
  );
}
