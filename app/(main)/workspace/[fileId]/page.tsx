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
    <div>
      <WorkspaceHeader fileName={fileDetails?.fileName || "Untitled"} />
      <div className="grid sm:grid-cols-2 gap-5 p-2">
        <div>
          <TextEditor fileId={fileId} />
        </div>
        <div>{fileDetails && <PdfViewer fileUrl={fileDetails.fileUrl} />}</div>
      </div>
    </div>
  );
}
