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
    <div className="w-[250px]   inline-block">
      <div className=" h-[calc(100%-30px)] overflow-hidden">
        <Image
          src={imageUrl ?? ""}
          alt={title || "瀑布流图片"}
          fill
          className={`object-contain h-full w-full transition-opacity duration-300`}
          onLoad={handleImageLoad}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      {/* <Card
        className="w-full h-full"
        isPressable={!!onClick}
        radius="none"
        onPress={onClick}
        ref={itemRef}
      >
        {imageUrl && (
          
        )}

        {(title || description) && (
          <CardBody className="p-3">
            {title && (
              <h3 className="text-lg font-semibold line-clamp-2 mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-gray-600 text-sm line-clamp-3">
                {description}
              </p>
            )}
          </CardBody>
        )}

        {footer && (
          <CardFooter className="p-3 pt-0 border-t border-gray-100">
            {footer}
          </CardFooter>
        )}
      </Card> */}
    </div>
  );
};
