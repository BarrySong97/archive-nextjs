import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import type { Record } from "@/db/schema";
import { record } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { CreateRecordInput } from "@/app/api/records/route";

/**
 * 创建新的待办事项
 */
export async function createRecord(input: CreateRecordInput): Promise<Record> {
  const now = new Date();
  const newItem = {
    title: input.title,
    description: input.description,
    images: input.images,
    author: input.author,
    source: input.source,
    cover: input.cover,
    favicon: input.favicon,
    avatar: input.avatar,
    userLink: input.userLink || null,
    createdAt: now,
    updatedAt: now,
  };

  const [result] = await db.insert(record).values(newItem).returning();

  return result;
}
