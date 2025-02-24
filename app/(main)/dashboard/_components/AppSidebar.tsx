"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutIcon, Shield } from "lucide-react";
import Image from "next/image";
import UploadPdf from "./UploadPdf";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

interface ProMemberTypes {
  isProMember: boolean;
  fileLimit: boolean;
}

export default function AppSidebar() {
  const path = usePathname();
  const { openUserProfile } = useClerk();

  const [proMember, setProMember] = useState<ProMemberTypes>({
    isProMember: false,
    fileLimit: false,
  });
  const { user } = useUser();
  const getUserDetails = useQuery(api.user.getUserDetails, {
    email: user?.primaryEmailAddress?.emailAddress || "",
  });
  const files = useQuery(api.fileStorage.getFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress || "",
  });

  useEffect(() => {
    if (getUserDetails && typeof getUserDetails === "object") {
      if (getUserDetails.membership) {
        setProMember({
          isProMember: true,
          fileLimit: false,
        });
      } else if ((files?.length ?? 0) >= 2) {
        setProMember({
          isProMember: false,
          fileLimit: true,
        });
      } else {
        setProMember({
          isProMember: false,
          fileLimit: false,
        });
      }
    }
  }, [getUserDetails, files]);

  return (
    <Sidebar collapsible="offcanvas" className="h-screen border-r">
      <SidebarHeader className="p-4">
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            width={130}
            height={130}
            alt="profile"
            className="mx-auto"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="mt-5">
        <SidebarGroup className="px-4 py-2">
          <UploadPdf fileLimit={proMember.fileLimit && !proMember.isProMember}>
            <Button className="w-full" variant="default">
              +Upload PDF
            </Button>
          </UploadPdf>
        </SidebarGroup>

        <SidebarGroup className="px-4 py-2">
          <nav className="flex flex-col space-y-2">
            <Link href="/dashboard" passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  path === "/dashboard" && "bg-accent text-accent-foreground"
                )}
              >
                <LayoutIcon className="mr-2 h-4 w-4" />
                Workspace
              </Button>
            </Link>
            <Link href="/dashboard/upgrade" passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  path === "/dashboard/upgrade" &&
                    "bg-accent text-accent-foreground"
                )}
              >
                <Shield className="mr-2 h-4 w-4" />
                Upgrade
              </Button>
            </Link>
          </nav>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-6 mt-auto ">
        <div className="space-y-2 border border-gray-200 shadow-xs p-3 rounded-lg ">
          <Progress
            value={
              proMember.isProMember
                ? ((files?.length ?? 0) / 100) * 100
                : ((files?.length ?? 0) / 2) * 100
            }
            className="h-2 "
          />
          <p className="text-sm text-muted-foreground">
            {files?.length} out of {proMember.isProMember ? "unlimited" : "2"}{" "}
            PDF Uploaded
          </p>
          {!proMember.isProMember && (
            <p className="text-sm text-muted-foreground">
              Upgrade to Upload more PDF
            </p>
          )}
        </div>
        <Separator className="border border-gray-100 shadow-xs my-2 mx-2" />

        <div
          className="flex gap-2 border border-gray-200 shadow-xs justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-slate-100  "
          title="Profile Settings"
          onClick={() => openUserProfile()}
        >
          <Image
            src={user?.imageUrl || "/profile.png"}
            width={35}
            height={35}
            alt="profile"
          />
          <div>
            <p className="text-sm">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
