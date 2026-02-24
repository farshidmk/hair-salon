"use client";

import { Roles } from "@/shared/consts";
import { LoggedInUser } from "@/types/user";

const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_INFO_KEY = "userInfo";
const ROLES_KEY = "roles";
const AUTH_CHANGED_EVENT = "auth-changed";
const tokenDefaultKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";

const getCookieValue = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const removeCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
};

const setCookie = (name: string, value: string, expiration?: string) => {
  if (typeof document === "undefined") return;
  let expires = "";
  if (expiration) {
    const expirationDate = new Date(expiration);
    if (!Number.isNaN(expirationDate.getTime())) {
      expires = `; expires=${expirationDate.toUTCString()}`;
    }
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return getCookieValue(ACCESS_TOKEN_KEY);
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

const buildUserInfoFromToken = (token: string): LoggedInUser | null => {
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
    role: role as Roles[],
  };
};

export const setAuthTokens = (token: string, refreshToken?: string, expiration?: string) => {
  if (typeof window === "undefined") return;
  setCookie(ACCESS_TOKEN_KEY, token, expiration);
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_KEY, refreshToken, expiration);
  }

  const userInfo = buildUserInfoFromToken(token);
  if (userInfo) {
    setCookie(
      USER_INFO_KEY,
      JSON.stringify({ surname: userInfo.surname, mobilePhone: userInfo.mobilePhone }),
      expiration
    );
    setCookie(ROLES_KEY, JSON.stringify(userInfo.role), expiration);
  }
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const clearAuthTokens = () => {
  if (typeof window === "undefined") return;
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
  removeCookie(USER_INFO_KEY);
  removeCookie(ROLES_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

const parseStoredUserInfo = (): Omit<LoggedInUser, "role"> | null => {
  try {
    const stored = getCookieValue(USER_INFO_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as { surname?: unknown; mobilePhone?: unknown };
    return {
      surname: String(parsed.surname ?? ""),
      mobilePhone: String(parsed.mobilePhone ?? ""),
    };
  } catch {
    return null;
  }
};

const parseStoredRoles = (): string[] => {
  try {
    const stored = getCookieValue(ROLES_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
};

export const getStoredUserInfo = (): LoggedInUser | null => {
  const storedInfo = parseStoredUserInfo();
  const storedRoles = parseStoredRoles();
  if (storedInfo) {
    return {
      ...storedInfo,
      role: storedRoles as Roles[],
    };
  }

  const token = getAccessToken();
  if (!token) return null;
  return buildUserInfoFromToken(token);
};

export const subscribeAuthChange = (listener: () => void) => {
  if (typeof window === "undefined") return () => undefined;

  const wrapped = () => listener();
  window.addEventListener(AUTH_CHANGED_EVENT, wrapped);

  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, wrapped);
  };
};
