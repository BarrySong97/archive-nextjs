"use client";
import React, { FC, useState, useEffect } from "react";
import { WaterfallList } from "@/components/common/WaterfallList";
import { WaterfallItemProps } from "@/components/common/WaterfallItem";
import { ActionBar, ActionItem } from "@/components/common/ActionBar";
import { Icon } from "@iconify/react";

export interface PageProps {}

const Page: FC<PageProps> = () => {
  const [items, setItems] = useState<WaterfallItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  // 模拟加载数据
  useEffect(() => {
    const generateMockItems = () => {
      const newItems: WaterfallItemProps[] = [];

      for (let i = 0; i < 20; i++) {
        const id = `item-${items.length + i}`;
        const height = Math.floor(Math.random() * 200) + 150; // 150-350px
        const aspectRatio = Math.random() * 0.5 + 0.5; // 0.5-1.0

        newItems.push({
          id,
          title: `瀑布流项目 ${items.length + i + 1}`,
          description: `这是一个示例描述，展示瀑布流布局的效果。这是项目 ${
            items.length + i + 1
          }。`,
          imageUrl: `https://picsum.photos/seed/${id}/400/${Math.floor(
            400 / aspectRatio
          )}`,
          height,
          aspectRatio,
          onClick: () => console.log(`点击了项目 ${id}`),
        });
      }

      return newItems;
    };

    // 模拟网络请求延迟
    setTimeout(() => {
      setItems(generateMockItems());
      setLoading(false);
    }, 1000);
  }, []);

  // 加载更多数据
  const handleLoadMore = () => {
    setLoading(true);

    // 模拟网络请求延迟
    setTimeout(() => {
      const newItems = [...items];

      for (let i = 0; i < 10; i++) {
        const id = `item-${items.length + i}`;
        const height = Math.floor(Math.random() * 200) + 150;
        const aspectRatio = Math.random() * 0.5 + 0.5;

        newItems.push({
          id,
          title: `瀑布流项目 ${items.length + i + 1}`,
          description: `这是一个示例描述，展示瀑布流布局的效果。这是项目 ${
            items.length + i + 1
          }。`,
          imageUrl: `https://picsum.photos/seed/${id}/400/${Math.floor(
            400 / aspectRatio
          )}`,
          height,
          aspectRatio,
          onClick: () => console.log(`点击了项目 ${id}`),
        });
      }

      setItems(newItems);
      setLoading(false);
    }, 1000);
  };

  // 底部操作栏按钮
  const actions: ActionItem[] = [
    {
      id: "home",
      label: "首页",
      icon: "mdi:home",
      onClick: () => console.log("点击了首页"),
      isActive: true,
    },
    {
      id: "discover",
      label: "发现",
      icon: "mdi:compass",
      onClick: () => console.log("点击了发现"),
    },
    {
      id: "add",
      label: "添加",
      icon: "mdi:plus-circle",
      onClick: () => console.log("点击了添加"),
      color: "primary",
    },
    {
      id: "messages",
      label: "消息",
      icon: "mdi:message",
      onClick: () => console.log("点击了消息"),
    },
    {
      id: "profile",
      label: "我的",
      icon: "mdi:account",
      onClick: () => console.log("点击了我的"),
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-center">瀑布流示例</h1>
      </header>

      <WaterfallList
        items={items}
        columnCount={2}
        gap={16}
        onEndReached={handleLoadMore}
        className="pb-20"
      />

      <ActionBar actions={actions} />
    </div>
  );
};

export default Page;
