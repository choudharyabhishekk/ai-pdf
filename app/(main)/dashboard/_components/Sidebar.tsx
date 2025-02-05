import { Button } from "@/components/ui/button";
import { Layout, LayoutIcon, Shield } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="shadow-md h-screen p-7">
      <Image src="/logo.png" width={170} height={120} alt="profile" />
      <div className="mt-10">
        <Button className="w-full">Upload PDF</Button>
        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <LayoutIcon />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
    </div>
  );
}
