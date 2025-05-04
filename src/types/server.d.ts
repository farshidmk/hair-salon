type ServerResponse<T = unknown> = {
  success: boolean;
  data?: T;
  errorMessage?: string[];
};
