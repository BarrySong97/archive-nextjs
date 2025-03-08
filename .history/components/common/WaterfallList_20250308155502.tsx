"use client";
import * as React from "react";

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { WaterfallItem } from "./WaterfallItem";

function getItems(nextGroupKey: number, count: number) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  for (let i = 0; i < count; ++i) {
    nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
  }
  return nextItems;
}

const Item = ({ num }: any) => (
  <div className="item">
    <div className="thumbnail">
      <img
        src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
          (num % 33) + 1
        }.jpg`}
        alt="egjs"
      />
    </div>
    <div className="info">{`egjs ${num}`}</div>
  </div>
);

export default function WaterfallList() {
  const [items, setItems] = React.useState(() => getItems(0, 10));

  return (
    <main className="container mx-auto px-4 sm:px-0 py-6">
      <MasonryInfiniteGrid
        align={"justify"}
        gap={8}
        useFirstRender={true}
        onRequestAppend={(e) => {
          const nextGroupKey = (+e.groupKey! || 0) + 1;

          setItems([...items, ...getItems(nextGroupKey, 10)]);
        }}
        onRenderComplete={(e) => {
          console.log(e);
        }}
      >
        {items.map((item) => (
          <WaterfallItem
            data-grid-groupkey={item.groupKey}
            id={item.key.toString()}
            onClick={() => {
              console.log(item);
            }}
            key={item.key}
            title={`egjs ${item.key}`}
            imageUrl={`https://naver.github.io/egjs-infinitegrid/assets/image/${
              (item.key % 33) + 1
            }.jpg`}
          />
        ))}
      </MasonryInfiniteGrid>
    </main>
  );
}
