// app/RootLayoutClient.tsx (Client Component)
"use client";

import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { usePathname } from "next/navigation";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarAndFooter =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/workspace");

  return (
    <ConvexClientProvider>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && <Footer />}
      <Toaster />
    </ConvexClientProvider>
  );
}
