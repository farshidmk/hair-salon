"use client";

import { LoggedInUser } from "@/types/user";

const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const AUTH_CHANGED_EVENT = "auth-changed";
const tokenDefaultKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAuthTokens = (token: string, refreshToken?: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const clearAuthTokens = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = window.atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const getStoredUserInfo = (): LoggedInUser | null => {
  const token = getAccessToken();
  if (!token) return null;

  const decoded = decodeJwtPayload(token);
  if (!decoded) return null;

  const roleValue = decoded.Role;
  const role = Array.isArray(roleValue)
    ? roleValue.filter((item): item is string => typeof item === "string")
    : typeof roleValue === "string"
      ? [roleValue]
      : [];

  return {
    mobilePhone: String(decoded[`${tokenDefaultKey}mobilephone`] ?? ""),
    surname: String(decoded[`${tokenDefaultKey}surname`] ?? ""),
    role,
  };
};

export const subscribeAuthChange = (listener: () => void) => {
  if (typeof window === "undefined") return () => undefined;

  const wrapped = () => listener();
  window.addEventListener("storage", wrapped);
  window.addEventListener(AUTH_CHANGED_EVENT, wrapped);

  return () => {
    window.removeEventListener("storage", wrapped);
    window.removeEventListener(AUTH_CHANGED_EVENT, wrapped);
  };
};
