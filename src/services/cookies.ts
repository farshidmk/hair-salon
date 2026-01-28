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
  const decodedToken = jwt.decode(token) as any;

  const tokenInfo: LoggedInUser = {
    mobilePhone: decodedToken[`${tokenDefaultKey}mobilephone`],
    surname: decodedToken[`${tokenDefaultKey}surname`],
    role: decodedToken[`Role`],
  };
  return tokenInfo;
}

export async function setLoginInfoInCookie(token: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {});
  cookieStore.set("refreshToken", refreshToken, {});
  return true;
}
