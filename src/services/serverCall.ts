import { api } from "@/shared/api";
import { getAccessToken } from "@/services/authToken";
import { ServerCall } from "@/types/server";
import { QueryFunction, QueryKey } from "@tanstack/react-query";
import axios from "axios";

// Generic server call
export async function serverCall<T = unknown>(config: ServerCall<T>): Promise<T> {
  try {
    const token = getAccessToken();
    const headers = { ...(config.headers ?? {}) };
    if (token && !("Authorization" in headers) && !("authorization" in headers)) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    const response = await api.request<T>({
      ...config,
      url: `/${config.url}`,
      headers,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
}

// Mutation wrapper for React Query
export const mutationRequest = <T = unknown, TVariables = ServerCall>(
  configFn?: (variables: TVariables) => ServerCall
) => {
  return async (variables: TVariables) => {
    const config = configFn ? configFn(variables) : (variables as ServerCall);
    return await serverCall(config);
  };
};

// GET request wrapper for React Query
export const getRequest = <T = unknown>(): QueryFunction<T, QueryKey> => {
  return async ({ queryKey }) => {
    let path = "";
    if (Array.isArray(queryKey)) {
      path = queryKey.join("/");
    } else {
      path = String(queryKey);
    }

    return await serverCall<T>({
      url: path,
      method: "GET",
    });
  };
};
