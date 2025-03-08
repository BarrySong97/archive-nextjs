import nodemailer from "nodemailer";

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: true, // 使用 SSL
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_DEFAULT_FROM,
      replyTo: process.env.EMAIL_DEFAULT_REPLY,
      to,
      subject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("邮件发送失败:", error);
    return { success: false, error };
  }
}
