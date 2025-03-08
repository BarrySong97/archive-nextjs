import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import type { Record } from "@/db/schema";
import { record } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { CreateRecordInput } from "@/app/api/records/route";

/**
 * 创建新的待办事项
 */
export async function createRecord(
  input: CreateRecordInput,
  userId: string
): Promise<Record> {
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
    userLink: input.userLink,
    createdAt: now,
    updatedAt: now,
    userId,
    id: uuidv4(),
  };

  const [result] = await db.insert(record).values(newItem).returning();

  return result;
}

/**
 * 获取待办事项列表
 */
export async function getRecordList(userId: string) {
  const records = await db
    .select()
    .from(record)
    .where(eq(record.userId, userId));
  return records;
}
