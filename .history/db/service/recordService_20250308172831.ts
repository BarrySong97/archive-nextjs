import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { Todo, todos } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export interface CreateTodoInput {
  content?: string | null;
  workspaceId: string;
  parentId?: string | null;
  previousId?: string | null;
  id?: string | null;
}

export interface UpdateTodoInput {
  content?: string;
  completed?: boolean;
  parentId?: string;
  previousId?: string;
}
async function getAndSortTodos(workspaceId: string): Promise<Todo[]> {
  // 1. 获取所有相关的 todos
  const allTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.workspaceId, workspaceId));

  // 2. 构建 previousId 到 todo 的映射 (使用 Map)
  const todoMap: Map<string, Todo> = new Map();
  const nullPreviousIdTodos: Todo[] = [];

  for (const todo of allTodos) {
    if (todo.previousId === null) {
      nullPreviousIdTodos.push(todo);
    } else {
      todoMap.set(todo.previousId, todo); // 使用 Map.set()
    }
  }

  // 3. 从 previousId 为 null 的开始，构建排序后的数组
  const sortedTodos: (typeof todos.$inferSelect)[] = [];
  for (let i = 0; i < nullPreviousIdTodos.length; i++) {
    let current: Todo | undefined = nullPreviousIdTodos[i];
    while (current) {
      sortedTodos.push(current);
      current = todoMap.get(current.id); // 使用 Map.get()
    }
  }

  return sortedTodos;
}

/**
 * 获取工作区的所有待办事项
 */
export async function getWorkspaceTodos(workspaceId: string): Promise<Todo[]> {
  return getAndSortTodos(workspaceId);
}

/**
 * 获取单个待办事项
 */
export async function getTodoItem(id: string): Promise<Todo | undefined> {
  const results = await db
    .select()
    .from(todos)
    .where(eq(todos.id, id))
    .execute();

  return results[0];
}

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
