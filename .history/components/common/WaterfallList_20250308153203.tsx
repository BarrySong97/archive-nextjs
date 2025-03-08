"use client";

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";

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
