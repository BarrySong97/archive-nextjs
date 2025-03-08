"use client";
import WaterfallList from "@/components/common/WaterfallList";
import React, { FC } from "react";
export interface PageProps {}
const Page: FC<PageProps> = () => {
  return (
    <div className=" mx-auto px-4 sm:px-0 py-6">
      <WaterfallList />
    </div>
  );
};

export default Page;
