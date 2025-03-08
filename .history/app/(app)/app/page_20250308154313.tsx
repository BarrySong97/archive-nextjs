"use client";
import { WaterfallItem } from "@/components/common/WaterfallItem";
import WaterfallList from "@/components/common/WaterfallList";
import { redirect } from "next/navigation";
import React, { FC } from "react";
export interface PageProps {}
const Page: FC<PageProps> = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <WaterfallList/>>
    </div>
  );
};

export default Page;
