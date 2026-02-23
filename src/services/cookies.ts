"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoggedInUser } from "@/types/user";

const tokenDefaultKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";

export async function getTokenInfo() {
  const cookieStore = await cookies();
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
    role: Array.isArray(decodedToken.Role)
      ? decodedToken.Role.filter((item): item is string => typeof item === "string")
      : typeof decodedToken.Role === "string"
        ? [decodedToken.Role]
        : [],
  };
  return tokenInfo;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("refreshToken");
  return true;
}
