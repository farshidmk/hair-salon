"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoggedInUser } from "@/types/user";

export async function getTokenInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Example: return data based on cookie
  if (!token) {
    return null;
  }
  const decodedToken = jwt.decode(token) as LoggedInUser;
  return decodedToken;
}
