"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAction, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function UploadPdf({
  children,
  fileLimit,
}: {
  children: React.ReactNode;
  fileLimit: boolean;
}) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.addFilesToDb);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("untitled");
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const { user } = useUser();
  const embeddDocument = useAction(api.myActions.ingest);

  // file upload handler
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // upload file handler
  const onUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: file?.type ? { "Content-Type": file.type } : undefined,
      body: file,
    });
    const { storageId } = await result.json();
    const fileId = uuidv4();
    const fileUrl = await getFileUrl({ storageId: storageId });

    //Step 3: Save the newly allocated storage id to the database
    const response = await addFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName as string,
      fileUrl: fileUrl as string,
      createdBy: user?.primaryEmailAddress?.emailAddress as string,
    });
    //API call to fetch PDF data
    const apiResponse = await fetch("/api/pdf-parser?pdfUrl=" + fileUrl);
    const data = await apiResponse.json();
    setLoading(false);
    dialogOpen && setDialogOpen(false);
    toast.success("File uploaded successfully");
    // embedd the document in background
    await embeddDocument({
      splitText: data.result,
      fileId: fileId,
    });
  };

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full"
            disabled={fileLimit}
            onClick={() => setDialogOpen(true)}
          >
            + Upload PDF File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Upload PDF file</DialogTitle>
            <DialogDescription asChild>
              <div>
                <h2>Select a file to upload</h2>
                <div className="flex gap-2 mt-2 p-3 rounded-md border border-gray-200">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => onFileSelect(e)}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="input">File Name *</label>
                  <Input
                    required
                    placeholder="File Name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" onClick={onUpload} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
