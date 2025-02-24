// app/layout.tsx (Server Component)
import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import RootLayoutClient from "./RootLayoutClient";
import { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aipdf.vercel.app.com"), // Replace with your domain
  title: {
    default: "AI PDF Generator - Create Professional PDFs with AI",
    template: "%s | AI PDF Generator",
  },
  description:
    "Generate professional PDFs with AI. Transform your content into beautifully formatted documents using advanced artificial intelligence.",
  keywords: [
    "AI PDF Generator",
    "PDF Creation",
    "AI Document Generation",
    "Document Automation",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Company Name",
  publisher: "Your Company Name",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aipdf.vercel.app.com",
    siteName: "AI PDF Generator",
    title: "AI PDF Generator - Create Professional PDFs with AI",
    description:
      "Generate professional PDFs with AI. Transform your content into beautifully formatted documents using advanced artificial intelligence.",
    images: [
      {
        url: "https://aipdf.vercel.app.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI PDF Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI PDF Generator - Create Professional PDFs with AI",
    description:
      "Generate professional PDFs with AI. Transform your content into beautifully formatted documents using advanced artificial intelligence.",
    images: ["https://aipdf.vercel.app.com/twitter-image.jpg"],
    creator: "@yourhandle",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    // Add other search engine verification codes as needed
  },
  alternates: {
    canonical: "https://aipdf.vercel.app.com",
    languages: {
      "en-US": "https://aipdf.vercel.app.com/en-US",
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Preconnect to important third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={outfit.className}>
        <ClerkProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </ClerkProvider>
      </body>
    </html>
  );
}
