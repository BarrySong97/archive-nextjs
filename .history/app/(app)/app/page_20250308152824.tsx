"use client";
import { redirect } from "next/navigation";
import React, { FC } from "react";
export interface PageProps {}
const Page: FC<PageProps> = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>Loading...</div>
    </div>
  );
};

export default Page;
