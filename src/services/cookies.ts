"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoggedInUser } from "@/types/user";

export async function getTokenInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return null;
  }
  const decodedToken = jwt.decode(token) as LoggedInUser;
  return decodedToken;
}

export async function setLoginInfoInCookie(token: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {});
  cookieStore.set("refreshToken", refreshToken, {});
  return true;
}
