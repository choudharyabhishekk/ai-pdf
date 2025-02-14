import React from "react";

interface PdfViewerProps {
  fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  return (
    <div>
      <iframe
        src={fileUrl + "#toolbar=0"}
        width="100%"
        className="h-[90vh] custom-scrollbar border-none"
      />
    </div>
  );
}
