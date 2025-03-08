"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { WaterfallItem, WaterfallItemProps } from "./WaterfallItem";

export interface WaterfallListProps {
  items: WaterfallItemProps[];
  columnCount?: number;
  gap?: number;
  className?: string;
  onEndReached?: () => void;
  endThreshold?: number;
}

export const WaterfallList: React.FC<WaterfallListProps> = ({
  items,
  columnCount = 2,
  gap = 16,
  className = "",
  onEndReached,
  endThreshold = 200,
}) => {
  const [columns, setColumns] = useState<WaterfallItemProps[][]>(
    Array.from({ length: columnCount }, () => [])
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: columnCount }, () => 0)
  );

  // 重新分配项目到各列
  useEffect(() => {
    if (items.length === 0) return;

    const newColumns: WaterfallItemProps[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const newHeights = Array.from({ length: columnCount }, () => 0);

    // 按照高度最小的列添加项目
    items.forEach((item) => {
      const minHeightIndex = newHeights.indexOf(Math.min(...newHeights));
      newColumns[minHeightIndex].push(item);
      newHeights[minHeightIndex] += item.height || 200; // 使用项目高度或默认高度
    });

    setColumns(newColumns);
    setHeights(newHeights);
  }, [items, columnCount]);

  // 监听滚动到底部
  useEffect(() => {
    if (!onEndReached) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const containerBottom =
        containerRef.current.getBoundingClientRect().bottom;

      if (containerBottom - window.innerHeight < endThreshold) {
        onEndReached();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onEndReached, endThreshold]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columnCount} gap-${gap} w-full ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {columns.map((column, colIndex) => (
        <div key={`column-${colIndex}`} className="flex flex-col gap-4">
          {column.map((item, itemIndex) => (
            <WaterfallItem key={`item-${colIndex}-${itemIndex}`} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
};
