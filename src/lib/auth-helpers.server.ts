import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import crypto from "node:crypto";
import { getAdminSettings, createSession, deleteSession, validateSession } from "./db";

// Helper: SHA-256 password hash
export function hashPassword(password: string, salt: string): string {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}

// Extract session token from standard HTTP cookie header
export function getSessionTokenFromRequest(): string | null {
  const req = getRequest();
  if (!req) return null;
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce(
    (acc: Record<string, string>, c: string) => {
      const parts = c.trim().split("=");
      const name = parts[0];
      const val = parts.slice(1).join("=");
      acc[name] = val;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies["session_token"] || null;
}

export async function loginAdminHelper(data: { username: string; password: string }) {
  const { username, password } = data;

  const settings = await getAdminSettings();
  if (username !== settings.username) {
    return { success: false, error: "Invalid username or password." };
  }

  const calculatedHash = hashPassword(password, settings.salt);
  if (calculatedHash !== settings.passwordHash) {
    return { success: false, error: "Invalid username or password." };
  }

  // Generate secure session token
  const token = crypto.randomBytes(32).toString("hex");
  await createSession(token, username);

  return { success: true, token };
}

export async function logoutAdminHelper() {
  const token = getSessionTokenFromRequest();
  if (token) {
    await deleteSession(token);
  }
  return { success: true };
}

export async function checkAuthSessionHelper() {
  const token = getSessionTokenFromRequest();
  if (!token) return { authenticated: false };

  const username = await validateSession(token);
  if (!username) return { authenticated: false };

  return { authenticated: true, username };
}
