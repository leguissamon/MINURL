import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5500",
  fetchOptions: {
    credentials: "include",
  },
});