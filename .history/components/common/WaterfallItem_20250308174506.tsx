"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";

export interface WaterfallItemProps {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  height?: number;
  aspectRatio?: number;
  onClick?: () => void;
  footer?: React.ReactNode;
  className?: string;
}

export const WaterfallItem: React.FC<WaterfallItemProps> = ({
  id,
  title,
  description,
  imageUrl,
  height,
  aspectRatio = 1,
  onClick,
  footer,
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  // 图片加载完成后的处理
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="inline-block w-[350px]">
      <div className="h-[calc(100%-30px)] overflow-hidden">
        <img
          src={imageUrl ?? ""}
          className="w-full h-full object-contain"
          alt="egjs"
        />
      </div>
      <div className="info">{`egjs ${id}`}</div>
    </div>
  );
};
