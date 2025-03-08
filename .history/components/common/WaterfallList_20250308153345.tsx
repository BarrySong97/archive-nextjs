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
  columnCount = 2,
  gap = 16,
  className = "",
  onEndReached,
  endThreshold = 200,
}) => {
  const [columns, setColumns] = useState<WaterfallItemProps[][]>(
    Array.from({ length: columnCount }, () => [])
  );
  const [items, setItems] = React.useState([]);

  return (
    <MasonryInfiniteGrid align="center" gap={5} onRequestAppend={(e) => {}}>
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
