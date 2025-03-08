"use client";

import { MasonryInfiniteGrid } from "@mantine/core";
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
    <MasonryInfiniteGrid
      align="center"
      gap={5}
      onRequestAppend={(e) => {
        const nextGroupKey = (e.groupKey || 0) + 1;
        const length = items.length;

        setItems([
          ...items,
          { groupKey: nextGroupKey, key: length },
          { groupKey: nextGroupKey, key: length + 1 },
          { groupKey: nextGroupKey, key: length + 2 },
        ]);
      }}
    >
      {items.map((item) => {
        return (
          <div
            className="item"
            data-grid-groupkey={item.groupKey}
            key={item.key}
          >
            {item.key}
          </div>
        );
      })}
    </MasonryInfiniteGrid>
  );
};
