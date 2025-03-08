"use client";
import * as React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { HeroUIProvider } from "@heroui/react";
import { TanstackProvider } from "./TanstackProvider";
import { ToastProvider } from "@heroui/toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <HeroUIProvider>
        <ToastProvider />
        <NuqsAdapter>{children}</NuqsAdapter>
      </HeroUIProvider>
    </TanstackProvider>
  );
}
