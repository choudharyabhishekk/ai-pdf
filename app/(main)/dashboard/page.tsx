"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.user.createUser);
  const files = useQuery(api.fileStorage.getFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress || "",
  });

  // check if user exists
  const checkUser = async (): Promise<void> => {
    if (!isLoaded) {
      console.log("User data is still loading...");
      return;
    }

    if (
      user?.primaryEmailAddress?.emailAddress &&
      user?.imageUrl &&
      user?.fullName
    ) {
      await createUser({
        email: user.primaryEmailAddress.emailAddress,
        imageUrl: user.imageUrl,
        userName: user.fullName,
      });
    } else {
      console.error("User information is incomplete.", user);
    }
  };

  useEffect(() => {
    checkUser();
  }, [isLoaded]);

  return (
    <div>
      <h2 className="font-medium text-3xl">Workspace</h2>
      {files ? (
        files.length === 0 ? (
          <h2 className="mt-4">
            Hello {user?.firstName}, start by uploading a PDF document.
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 p-3 mt-3 gap-5 ">
            {files.map((file, index) => (
              <Link
                href={`/workspace/${file.fileId}`}
                key={index}
                title={file.fileName}
              >
                <div className="flex w-52 h-32 flex-col gap-2 items-center justify-center p-3 shadow-md border rounded-lg cursor-pointer hover:scale-105 transition-all">
                  <Image
                    src={"/pdf.png"}
                    alt={file.fileName}
                    width={50}
                    height={50}
                  />
                  <h2>
                    {file?.fileName?.length > 14
                      ? file?.fileName?.slice(0, 14) + "..."
                      : file?.fileName}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 p-5 mt-3">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
        </div>
      )}
    </div>
  );
}
