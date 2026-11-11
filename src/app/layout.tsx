import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthRedirectGuard from "@/components/AuthRedirectGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IntFit.ai — Your Personal AI Fitness Companion | Intelligent Adaptive Training",
  description:
    "Not a static workout template. IntFit.ai is the intelligent fitness companion that continuously adapts your gym workouts, progressive overload, sets, reps, and nutrition around your actual performance.",
  keywords: [
    "IntFit.ai",
    "intfit.ai",
    "AI fitness",
    "personal trainer AI",
    "progressive overload app",
    "adaptive workout plan",
    "intelligent strength training",
    "smart gym companion",
  ],
  authors: [{ name: "IntFit.ai Technologies" }],
  openGraph: {
    title: "IntFit.ai — Train Smarter. Progress Continuously.",
    description:
      "Your personal AI fitness companion that adapts your workouts, nutrition and progression around you in real time.",
    url: "https://intfit.ai",
    siteName: "IntFit.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntFit.ai — Personal AI Fitness Companion",
    description: "Adaptive workouts and progressive overload intelligence built around you.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable} dark`}>
      <body className="min-h-screen bg-[#07080b] text-[#f3f5f9] antialiased selection:bg-[#ccff00] selection:text-black">
        <AuthProvider>
          <AuthRedirectGuard>{children}</AuthRedirectGuard>
        </AuthProvider>
      </body>
    </html>
  );
}