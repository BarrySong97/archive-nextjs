"use client";
import React, { FC } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">欢迎使用示例应用</h1>
      <Link href="/app/waterfall">
        <Button color="primary" size="lg">
          查看瀑布流示例
        </Button>
      </Link>
    </div>
  );
};

export default Page;
