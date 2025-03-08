"use client";
import { WaterfallItem } from "@/components/common/WaterfallItem";
import WaterfallList from "@/components/common/WaterfallList";
import { redirect } from "next/navigation";
import React, { FC } from "react";
export interface PageProps {}
const Page: FC<PageProps> = () => {
  return (
    <div className="container mx-auto px-4 sm:px-0 py-6">
      <WaterfallList />
    </div>
  );
};

export default Page;
