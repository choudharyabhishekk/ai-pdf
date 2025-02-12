"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutIcon, Shield } from "lucide-react";
import Image from "next/image";
import UploadPdf from "./UploadPdf";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Sidebar() {
  const { user } = useUser();
  const files = useQuery(api.fileStorage.getFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress || "",
  });

  return (
    <div className="shadow-md h-screen p-7">
      <Image src="/logo.png" width={170} height={120} alt="profile" />
      <div className="mt-10">
        <UploadPdf fileLimit={files && files?.length >= 2 ? true : false}>
          <Button className="w-full">+Upload PDF</Button>
        </UploadPdf>
        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <LayoutIcon />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={((files?.length ?? 0) / 2) * 100} />
        <p className="text-sm mt-2">{files?.length} out of 2 PDF Uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to Upload more PDF</p>
      </div>
    </div>
  );
}
