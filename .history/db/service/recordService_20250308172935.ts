import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { Record } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

/**
 * 创建新的待办事项
 */
export async function createTodoItem(input: CreateTodoInput): Promise<Todo> {
  const now = new Date();
  const newItem = {
    id: input.id || uuidv4(),
    content: input.content || "",
    completed: false,
    workspaceId: input.workspaceId,
    parentId: input.parentId || null,
    previousId: input.previousId || null,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(todos).values(newItem).execute();

  return newItem;
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
