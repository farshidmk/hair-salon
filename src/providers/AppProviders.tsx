"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import AppThemeProvider from "./AppThemeProvider";
import { getRequest, serverCall } from "@/services/serverCall";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: getRequest,
    },

    mutations: {
      mutationFn: serverCall,
    },
  },
});

const AppProviders = ({ children }: Props) => {
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
    </AppThemeProvider>
  );
};

export default AppProviders;
