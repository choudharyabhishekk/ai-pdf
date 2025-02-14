import { UserButton } from "@clerk/nextjs";
import { FilePen, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WorkspaceHeader({ fileName }: { fileName: string }) {
  return (
    <nav className="flex h-[8vh] p-2 justify-between shadow-sm ">
      <div>
        <Link href="/dashboard">
          <Image
            title="View Dashboard"
            src="/logo.png"
            width={100}
            height={100}
            alt="profile"
            className="mx-auto"
          />
        </Link>
      </div>
      <div className="flex gap-1 items-center" title="File Name">
        <FileText size={18} />
        {fileName}
      </div>
      <UserButton />
    </nav>
  );
}
