"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoggedInUser } from "@/types/user";
import { Roles } from "@/shared/consts";

const tokenDefaultKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";

export async function getTokenInfo() {
  const cookieStore = await cookies();
  const storedUserInfo = cookieStore.get("userInfo")?.value;
  const storedRoles = cookieStore.get("roles")?.value;
  if (storedUserInfo) {
    try {
      const userInfo = JSON.parse(storedUserInfo) as { mobilePhone?: unknown; surname?: unknown };
      const roles = storedRoles ? (JSON.parse(storedRoles) as unknown) : [];
      return {
        mobilePhone: String(userInfo.mobilePhone ?? ""),
        surname: String(userInfo.surname ?? ""),
        role: (Array.isArray(roles) ? roles.filter((item): item is string => typeof item === "string") : []) as Roles[],
      } satisfies LoggedInUser;
    } catch {
      // fallback to decoding token if cookie values are malformed
    }
  }

  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }
  const decodedToken = jwt.decode(token) as Record<string, unknown> | null;
  if (!decodedToken) {
    return null;
  }

  const tokenInfo: LoggedInUser = {
    mobilePhone: String(decodedToken[`${tokenDefaultKey}mobilephone`] ?? ""),
    surname: String(decodedToken[`${tokenDefaultKey}surname`] ?? ""),
    role: (Array.isArray(decodedToken.Role)
      ? decodedToken.Role.filter((item): item is string => typeof item === "string")
      : typeof decodedToken.Role === "string"
        ? [decodedToken.Role]
        : []) as Roles[],
  };
  return tokenInfo;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userInfo");
  cookieStore.delete("roles");
  return true;
}
