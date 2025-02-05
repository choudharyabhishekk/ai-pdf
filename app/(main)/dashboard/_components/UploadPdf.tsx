import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function UploadPdf({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Upload PDF file</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="flex gap-2 p-3 rounded-md border border-gray-200">
                  <h2>Select a file to upload</h2>
                  <input type="file" />
                </div>
                <div>
                  <label htmlFor="input">File Name *</label>
                  <Input placeholder="File Name" />
                </div>
                <div>
                  <Button></Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
