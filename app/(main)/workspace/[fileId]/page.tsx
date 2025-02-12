"use client";
import { useParams } from "next/navigation";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PdfViewer from "../_components/PdfViewer";
import TextEditor from "../_components/TextEditor";

export default function Workspace() {
  const fileId: any = useParams().fileId;
  const fileDetails = useQuery(api.fileStorage.getFileDetails, {
    fileId: fileId,
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <WorkspaceHeader fileName={fileDetails?.fileName || "Untitled"} />
      <div className="grid sm:grid-cols-2 gap-5 p-2 flex-grow overflow-hidden">
        <div className="overflow-hidden custom-scrollbar">
          <TextEditor fileId={fileId} />
        </div>
        <div className="overflow-hidden custom-scrollbar">
          {fileDetails && <PdfViewer fileUrl={fileDetails.fileUrl} />}
        </div>
      </div>
    </div>
  );
}
