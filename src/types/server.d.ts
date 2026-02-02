import { AxiosRequestConfig, Method } from "axios";

export type ServerResponse<T = unknown> = {
  data: T;
  succeeded: boolean;
  messages: string;
  errorList: string[];
};

export type ServerCall<T = unknown> = Omit<AxiosRequestConfig<T>, "method"> & {
  method: Method;
};

export type PaginatedServerResponse<T = unknown> = {
  data: {
    items: T[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  succeeded: boolean;
  messages: string;
  errorList: string[];
};
