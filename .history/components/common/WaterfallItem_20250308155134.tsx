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
    <Card
      className="w-[250px]  inline-block"
      isPressable={!!onClick}
      radius="none"
      onPress={onClick}
      ref={itemRef}
    >
      {imageUrl && (
        <div className=" h-[calc(100%-30px)] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title || "瀑布流图片"}
            fill
            className={`object-cover h-full w-full transition-opacity duration-300`}
            onLoad={handleImageLoad}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}
    </Card>
  );
};
