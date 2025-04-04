import React from "react";
import Header from "./_components/Header";
import AppSidebar from "./_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-screen w-full">
        <Header />
        <main className="p-10">{children}</main>
      </div>
    </SidebarProvider>
  );
}
