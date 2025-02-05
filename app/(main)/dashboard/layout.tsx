import React from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

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
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
