import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withAuth } from "../middleware";
import { to } from "await-to-js";
import { createRecord } from "@/db/service/recordService";
const createRecordSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  author: z.string(),
  source: z.string(),
  cover: z.string().optional(),
  favicon: z.string().optional(),
  avatar: z.string().optional(),
  userLink: z.string().optional(),
});

export type CreateRecordInput = z.infer<typeof createRecordSchema>;

export const GET = withAuth(async (req: NextRequest, userId: string) => {});

/**
 * 创建新的工作区项目
 */
export const POST = withAuth(async (req: NextRequest, userId: string) => {
  const [parseErr, body] = await to(req.json());
  console.log(body);
  return;
  if (parseErr) {
    return NextResponse.json({ error: "无效的请求数据" }, { status: 400 });
  }

  const validationResult = createRecordSchema.safeParse(body);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: "无效的请求数据", details: validationResult.error.format() },
      { status: 400 }
    );
  }

  const [createErr, newWorkspaceItem] = await to(
    createRecord(validationResult.data, userId)
  );

  if (createErr) {
    console.error("创建工作区项目失败:", createErr);
    return NextResponse.json({ error: "创建工作区项目失败" }, { status: 500 });
  }

  return NextResponse.json(newWorkspaceItem, { status: 201 });
});
