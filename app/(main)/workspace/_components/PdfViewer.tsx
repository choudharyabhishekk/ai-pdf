import React from "react";

interface PdfViewerProps {
  fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  return (
    <div>
      <iframe
  src={fileUrl + "#toolbar=0&view=FitH&zoom=100"}
  width="100%"
  loading="lazy"
  className="h-[90vh] rounded-lg custom-scrollbar transition-all duration-300 border shadow-sm "

  title="PDF Document Viewer"
/>
    
    </div>
  );
}
