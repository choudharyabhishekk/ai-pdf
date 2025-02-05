import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-end shadow-sm p-5">
      <UserButton />
    </div>
  );
}
