"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import GridDistortion from "@/components/bitui/GridDistortion";
import { authClient } from "@/lib/auth-client";
import { useQueryState, parseAsBoolean } from "nuqs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 定义注册表单的验证模式
const signupSchema = z
  .object({
    username: z.string().min(2, "用户名至少需要2个字符"),
    email: z.string().email("请输入有效的邮箱地址"),
    password: z.string().min(8, "密码长度至少为8位"),
    confirmPassword: z.string().min(1, "请确认密码"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// 定义表单数据类型
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const [registered, setRegistered] = useQueryState(
    "registered",
    parseAsBoolean.withDefault(false)
  );
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 初始化 React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // 在输入框失去焦点时进行校验
  });

  // 获取表单中的邮箱值，用于显示在注册成功页面
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // 当密码变化时，如果确认密码已经有值，则触发确认密码的验证
  useEffect(() => {
    if (passwordValue) {
      trigger("confirmPassword");
    }
  }, [passwordValue, trigger]);

  useEffect(() => {
    // 初始设置
    setHeight(window.innerHeight);

    // 监听窗口大小变化
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 清理监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSubmit = async (data: SignupFormData) => {
    setError("");

    try {
      setLoading(true);
      const { data: responseData, error: authError } =
        await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.username,
          callbackURL: "/app",
        });

      if (authError) {
        throw new Error(authError.message || "注册失败，请稍后重试");
      }

      // 设置注册成功状态
      await setRegistered(true);
    } catch (err: any) {
      console.error("注册失败:", err);
      setError(err.message || "注册失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 左侧动画区域 */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary to-primary-100">
        <div className="absolute inset-0">
          <GridDistortion
            imageSrc="/auth/signup.jpg"
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="h-full w-full"
          />
        </div>
        <div className="absolute bottom-8 left-8 z-20">
          <h2 className="text-4xl font-bold text-white mb-2">开始你的旅程</h2>
          <p className="text-white/90 text-lg">创建账号，记录精彩生活</p>
          <Button
            href="/signin"
            color="primary"
            className="mt-4"
            size="sm"
            variant="bordered"
          >
            立即登录
          </Button>
        </div>
      </div>

      {/* 右侧注册区域 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        {registered ? (
          <Card className="w-full max-w-md p-8 text-center">
            <CardHeader className="flex flex-col items-center gap-4 pb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:check" className="text-4xl text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">注册成功！</h1>
              <p className="text-gray-600">
                请检查你的邮箱 <span className="font-medium">{emailValue}</span>{" "}
                完成验证。
              </p>
            </CardHeader>
          </Card>
        ) : (
          <Card className="w-full max-w-md p-4">
            <CardHeader className="flex flex-col items-center gap-2 pb-3">
              <h1 className="text-2xl font-bold">注册账号</h1>
              <p className="text-gray-600 text-sm">选择您喜欢的注册方式</p>
              {error && (
                <div className="w-full text-center text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
            </CardHeader>
            <CardBody className="gap-4">
              {/* 社交登录按钮 */}
              <div className="flex gap-3">
                <Button
                  startContent={
                    <Icon icon="flat-color-icons:google" className="text-xl" />
                  }
                  className="w-full bg-white border-2 border-gray-200 hover:bg-gray-50"
                  variant="bordered"
                  size="sm"
                >
                  Google 注册
                </Button>
                <Button
                  startContent={<Icon icon="mdi:github" className="text-xl" />}
                  className="w-full bg-black text-white hover:bg-black/90"
                  size="sm"
                >
                  GitHub 注册
                </Button>
              </div>

              <div className="flex items-center gap-4 my-2">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-gray-500 text-sm">或</span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              {/* 邮箱注册表单 */}
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="text"
                  label="用户名"
                  placeholder="请输入用户名"
                  {...register("username")}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                  size="sm"
                  isRequired
                />
                <Input
                  type="email"
                  label="邮箱"
                  placeholder="请输入您的邮箱"
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  size="sm"
                  isRequired
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  label="密码"
                  placeholder="请输入密码"
                  {...register("password")}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  size="sm"
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
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  label="确认密码"
                  placeholder="请再次输入密码"
                  {...register("confirmPassword")}
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                  size="sm"
                  isRequired
                  endContent={
                    <button
                      type="button"
                      className="focus:outline-none"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Icon
                        icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                        className="text-xl text-gray-500 hover:text-gray-700"
                      />
                    </button>
                  }
                />
                <Button
                  type="submit"
                  color="primary"
                  className="w-full mt-1"
                  isLoading={loading}
                  isDisabled={loading}
                >
                  {loading ? "注册中..." : "注册"}
                </Button>
              </form>

              <div className="flex justify-center text-sm">
                <span className="text-gray-600">已有账号？</span>
                <a href="/signin" className="text-primary hover:underline ml-2">
                  立即登录
                </a>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
