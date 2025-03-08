import { createAuthClient } from "better-auth/react";
const isServer = typeof window === "undefined";
export const authClient = createAuthClient({
  baseURL: isServer
    ? process.env.BETTER_AUTH_URL
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
