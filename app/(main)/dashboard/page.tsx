"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useUser();
  const files = useQuery(api.fileStorage.getFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress || "",
  });

  return (
    <div>
      <h2 className="font-medium text-3xl">Workspace</h2>
      <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 mt-3">
        {files && files.length > 0 ? (
          files?.map((file, index) => (
            <Link href={`/workspace/${file.fileId}`} key={index}>
              <div
                key={index}
                className="flex flex-col gap-2 items-center p-3 shadow-md rounded-lg cursor-pointer hover:scale-105 transition-all"
              >
                <Image
                  src={"/pdf.png"}
                  alt={file.fileName}
                  width={50}
                  height={50}
                />
                <h2>{file?.fileName}</h2>
              </div>
            </Link>
          ))
        ) : (
          <>
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
