import api from "@/lib/axios";
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import getCookie from "./getCookie";

export const serverCall: MutationFunction<unknown, unknown> = async (
  variables
) => {
  const { url, method, data } = variables as AxiosRequestConfig;
  try {
    const requestOptions: AxiosRequestConfig = {
      url,
      method,
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
      data,
    };
    const response = await api({ ...requestOptions });
    if (response?.status === 200) {
      return response?.data;
    } else if (response?.status === 204) {
      return { data: { rows: [] } };
    } else {
      throw new Error(`Error on operation... - ${response?.statusText}`);
    }
  } catch (e) {
    if (isServerError(e) && e.response?.status === 400) {
      const tempError = e.response.data;
      throw tempError;
    }
    throw new Error(JSON.stringify(e) || `Error on operation...`);
  }
};

export const getRequest: QueryFunction<unknown, QueryKey, never> = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  let url = "";
  if (Array.isArray(queryKey)) {
    url = queryKey.join("/");
  }
  url = String(url);
  try {
    return await serverCall({ url, method: "get" });
  } catch (error: unknown) {
    if (isErrorWithMessage(error)) {
      throw new Error(error.message);
    }
    throw new Error(`خطا در دریافت اطلاعات`);
  }
};

function isServerError(obj: unknown): obj is AxiosError<ServerResponse> {
  return typeof obj === "object" && obj !== null && "response" in obj;
}

function isErrorWithMessage(obj: unknown): obj is Error {
  return typeof obj === "object" && obj !== null && "message" in obj;
}
