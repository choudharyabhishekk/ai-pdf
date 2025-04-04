import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex justify-between items-center px-4 py-3 bg-background border-b">
      <div>
        <SidebarTrigger />
      </div>
      <UserButton  />
    </header>
  );
}
