"use client";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoaded } = useUser(); // Add isLoaded to check if user data is fully loaded
  const createUser = useMutation(api.user.createUser);

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
  }, [user, isLoaded]);

  return (
    <div>
      <h1>AI PDF Generator</h1>
      <p>Generate PDFs with AI</p>
      <UserButton />
    </div>
  );
}
