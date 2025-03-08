import { Record } from "@/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const recordKeys = {
  all: ["records"] as const,
  lists: () => [...recordKeys.all, "list"] as const,
  detail: (id: string) => [...recordKeys.all, "detail", id] as const,
};

export const useRecordList = () => {
  return useQuery({
    queryKey: recordKeys.lists(),
    queryFn: async () => {
      const response = await fetch("/api/records");
      if (!response.ok) {
        throw new Error("获取工作区列表失败");
      }
      return response.json() as Promise<Record[]>;
    },
  });
};
