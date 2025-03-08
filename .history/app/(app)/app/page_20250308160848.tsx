"use client";
import WaterfallList from "@/components/common/WaterfallList";
import React, { FC } from "react";
export interface PageProps {}
const Page: FC<PageProps> = () => {
  return (
    <div className="  px-4  py-6">
      <WaterfallList />
    </div>
  );
};

export default Page;
