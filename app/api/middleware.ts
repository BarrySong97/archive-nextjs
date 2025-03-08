import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 鉴权工具函数
type AuthenticatedHandler<T = any> = (
  req: NextRequest,
  userId: string,
  routeParams: Promise<T>
) => Promise<NextResponse>;

export const withAuth = <T = any>(handler: AuthenticatedHandler<T>) => {
  return async (req: NextRequest, routeParams?: any) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    return handler(req, session.user.id, routeParams.params as any);
  };
};
