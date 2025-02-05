"use client";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  // check if user exists
  const checkUser = async (): Promise<void> => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress as string,
      imageUrl: user?.imageUrl as string,
      userName: user?.fullName as string,
    });
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <div>
      <h1>AI PDF Generator</h1>
      <p>Generate PDFs with AI</p>
      <UserButton />
    </div>
  );
}
