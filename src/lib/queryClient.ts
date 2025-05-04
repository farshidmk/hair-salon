import { QueryClient } from "@tanstack/react-query";
import { getRequest, serverCall } from "../shared/serverCall";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getRequest,
    },
    mutations: {
      mutationFn: serverCall,
    },
  },
});

export default queryClient;
