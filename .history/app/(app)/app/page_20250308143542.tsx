"use client";
import { useWorkspaceList } from "@/service/workspace.route";
import { Skeleton } from "@heroui/react";
import { redirect } from "next/navigation";
import React, { FC } from "react";
export interface PageProps {}
const Page: FC<PageProps> = () => {
  const { data: workspaceItems = [], isLoading } = useWorkspaceList();
  if (!isLoading) {
    if (workspaceItems.length === 0) {
      return redirect("/app/create");
    }
    return redirect(`/app/${workspaceItems[0].id}`);
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>Loading...</div>
    </div>
  );
};

export default Page;
