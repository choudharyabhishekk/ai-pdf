import { UserButton } from "@clerk/nextjs";
import { FilePen, FileText } from "lucide-react";

export default function WorkspaceHeader({ fileName }: { fileName: string }) {
  return (
    <div className="flex p-4 justify-between shadow-md">
      <h1>AI Note Taker</h1>
      <div className="flex gap-1 items-center">
        <FileText size={18} />
        {fileName}
      </div>
      <UserButton />
    </div>
  );
}
