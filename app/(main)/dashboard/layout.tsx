import React from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="md:w-64 h-screen fixed ">
        <Sidebar />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}
