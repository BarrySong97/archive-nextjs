import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import type { Record } from "@/db/schema";
import { records } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { CreateRecordInput } from "@/app/api/records/route";

/**
 * 创建新的待办事项
 */
export async function createRecord(input: CreateRecordInput): Promise<Record> {
  const now = new Date();
  const newItem = {
    title: input.title,
    description: input.description || null,
    images: input.images || null,
    author: input.author,
    source: input.source,
    cover: input.cover || null,
    favicon: input.favicon || null,
    avatar: input.avatar || null,
    userLink: input.userLink || null,
    createdAt: now,
    updatedAt: now,
  };

  const [result] = await db.insert(records).values(newItem).returning();

  return result;
}

/**
 * 更新待办事项
 */
export async function updateTodoItem(
  id: string,
  input: UpdateTodoInput
): Promise<Todo | undefined> {
  const now = new Date();

  const results = await db
    .update(todos)
    .set({
      ...input,
      updatedAt: now,
    })
    .where(eq(todos.id, id))
    .returning()
    .execute();

  return results[0];
}

/**
 * 删除待办事项
 */
export async function deleteTodoItem(id: string): Promise<boolean> {
  const result = await db.delete(todos).where(eq(todos.id, id)).execute();

  return result.rowCount ? result.rowCount > 0 : false;
}

/**
 * 切换待办事项的完成状态
 */
export async function toggleTodoItemComplete(
  id: string
): Promise<Todo | undefined> {
  const todo = await getTodoItem(id);
  if (!todo) return undefined;

  return updateTodoItem(id, { completed: !todo.completed });
}
