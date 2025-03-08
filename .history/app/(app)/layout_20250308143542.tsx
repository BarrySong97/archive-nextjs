import type { Metadata } from "next";
import "../globals.css";
import Layout from "@/components/layout/Layout";
import Providers from "../providers";
import { GlobalConfirmModal } from "@/components/common/ConfirmModal";

export const metadata: Metadata = {
  title: {
    default: "Journal Todo",
    template: "%s | Journal Todo",
  },
  description:
    "Journal Todo is a simple and effective way to manage your todo list.",
  keywords: [
    "todo list",
    "todo management",
    "todo app",
    "todo list app",
    "todo list management",
  ],
  authors: [{ name: "Barry Song" }],
  creator: "Barry Song",
  publisher: "Barry Song",
  openGraph: {
    title: "Journal Todo",
    description: "Journal Todo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Site preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal Todo",
    description: "Journal Todo",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalConfirmModal />
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
