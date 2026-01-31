import { AxiosRequestConfig, Method } from "axios";

export type ServerResponse<T = unknown> = {
  Data: T;
  Succeeded: boolean;
  Messages: string;
  ErrorList: string[];
};

export type ServerCall<T = unknown> = Omit<AxiosRequestConfig<T>, "method"> & {
  method: Method;
};

export type PaginatedServerResponse<T = unknown> = {
  Data: {
    Items: T[];
    PageNumber: number;
    TotalPages: number;
    TotalCount: number;
    HasPreviousPage: boolean;
    HasNextPage: boolean;
  };
  Succeeded: boolean;
  Messages: string;
  ErrorList: string[];
};
