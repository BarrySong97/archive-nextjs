import { Record } from "@/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const recordKeys = {
  all: ["records"] as const,
  lists: () => [...recordKeys.all, "list"] as const,
  detail: (id: string) => [...recordKeys.all, "detail", id] as const,
};
