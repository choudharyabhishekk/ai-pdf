
import "./globals.css";
import { Outfit } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const etadata = {
  title: "AI PDF Generator",
  description: "Generate PDFs with AI",
}

const outfit = Outfit({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">

      <body
        className={outfit.className}
      >
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider></ClerkProvider>
      </body>
    </html >
  );
}
