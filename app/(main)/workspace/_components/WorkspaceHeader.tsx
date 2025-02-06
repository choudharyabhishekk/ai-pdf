import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function WorkspaceHeader() {
  return (
    <div className="p-4 justify-between shadow-md">
      {/* <Image src={"./logo.png"} alt="logo" width={100} height={100}></Image> */}
      <UserButton />
    </div>
  );
}
