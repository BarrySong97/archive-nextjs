"use client";
import * as React from "react";

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { WaterfallItem } from "./WaterfallItem";
import { useRecordList } from "@/services/record.query";

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
  const { data } = useRecordList();

  return (
    <main className="">
      <MasonryInfiniteGrid
        align={"justify"}
        gap={0}
        useFirstRender={true}
        onRenderComplete={(e) => {
          console.log(e);
        }}
      >
        {data?.map((item) => (
          <WaterfallItem
            data-grid-groupkey={item.id}
            id={item.id}
            onClick={() => {
              console.log(item);
            }}
            key={item.id}
            title={item.title}
            imageUrl={item.cover ?? ""}
          />
        ))}
      </MasonryInfiniteGrid>
    </main>
  );
}
