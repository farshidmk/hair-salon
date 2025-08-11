type ApiCallResponse<T = unknown> = {
  Data: T;
  Succeeded: boolean;
  Messages: string;
  ErrorList: string[];
};
