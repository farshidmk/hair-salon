import { api } from "@/shared/api";
import { MutationFunction, QueryFunction, QueryKey } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export const serverCall: MutationFunction<unknown, unknown> = async (variables) => {
  const { url, method, data, ...rest } = variables as AxiosRequestConfig;
  try {
    const requestOptions: AxiosRequestConfig = {
      url,
      method,
      withCredentials: true,
      data,
      ...rest,
    };
    const response = await api({ ...requestOptions });
    if (response?.status === 200) {
      return response?.data;
    } else {
      throw new Error(`Error on operation... - ${response?.statusText}`);
    }
  } catch (e) {
    throw new Error(JSON.stringify(e) || `Error on operation...`);
  }
};

export const getRequest: QueryFunction<unknown, QueryKey, never> = async ({ queryKey }: { queryKey: QueryKey }) => {
  let tempEntity = "";
  if (Array.isArray(queryKey)) {
    tempEntity = queryKey.join("/");
  }
  tempEntity = String(tempEntity);
  try {
    return await serverCall({ entity: tempEntity, method: "get" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error on Fetching Data");
    }
  }
};
