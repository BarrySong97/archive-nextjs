"use client";

import { Button, Input, Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import GridDistortion from "@/components/bitui/GridDistortion";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 定义登录表单的验证模式
const loginSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(1, "请输入密码"),
});

// 定义表单数据类型
type LoginFormData = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const registered = searchParams.get("registered");

  // 初始化 React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // 在输入框失去焦点时进行校验
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      setLoading(true);
      const { error: authError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        console.log(authError);
        throw new Error(
          authError.message || "登录失败，请检查邮箱和密码是否正确"
        );
      }

      // 登录成功,跳转到首页
      router.push("/app");
    } catch (err: any) {
      console.error("登录失败:", err);
      setError(err.message || "登录失败，请检查邮箱和密码是否正确");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 左侧动画区域 */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary to-primary-100">
        <GridDistortion
          imageSrc="/auth/signin.jpg"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="h-full w-full"
        />
        <div className="absolute bottom-8 left-8 z-20">
          <h2 className="text-4xl font-bold text-white mb-4">欢迎回来</h2>
          <p className="text-white/90 text-lg">记录生活，规划未来</p>
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8">
          <CardHeader className="flex flex-col items-center gap-4 pb-6">
            <h1 className="text-2xl font-bold">登录</h1>
            <p className="text-gray-600">选择您喜欢的登录方式</p>
            {registered && (
              <div className="w-full text-center text-green-500 text-sm mt-2">
                注册成功! 请登录
              </div>
            )}
            {error && (
              <div className="w-full text-center text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
          </CardHeader>
          <CardBody className="gap-6">
            {/* 社交登录按钮 */}
            <div className="flex flex-col gap-4">
              <Button
                startContent={
                  <Icon icon="flat-color-icons:google" className="text-xl" />
                }
                className="w-full bg-white border-2 border-gray-200 hover:bg-gray-50"
                variant="bordered"
              >
                使用 Google 登录
              </Button>
              <Button
                startContent={<Icon icon="mdi:github" className="text-xl" />}
                className="w-full bg-black text-white hover:bg-black/90"
              >
                使用 GitHub 登录
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-gray-500 text-sm">或</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* 邮箱登录表单 */}
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type="email"
                label="邮箱"
                placeholder="请输入您的邮箱"
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                isRequired
              />
              <Input
                type={showPassword ? "text" : "password"}
                label="密码"
                placeholder="请输入密码"
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                isRequired
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                      className="text-xl text-gray-500 hover:text-gray-700"
                    />
                  </button>
                }
              />
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={loading}
                isDisabled={loading}
              >
                {loading ? "登录中..." : "登录"}
              </Button>
            </form>

            <div className="flex justify-between text-sm mt-4">
              <a href="/signup" className="text-primary hover:underline">
                注册新账号
              </a>
              <a
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                忘记密码？
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
