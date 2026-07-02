import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { loginAdminHelper, logoutAdminHelper, checkAuthSessionHelper } from "./auth-helpers.server";

// Server functions using builder API
export const loginAdmin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      username: z.string(),
      password: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    return await loginAdminHelper(data);
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  return await logoutAdminHelper();
});

export const checkAuthSession = createServerFn({ method: "GET" }).handler(async () => {
  return await checkAuthSessionHelper();
});
