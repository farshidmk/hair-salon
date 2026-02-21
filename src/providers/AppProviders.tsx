"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import AppThemeProvider from "./AppThemeProvider";
import { getRequest, mutationRequest } from "@/services/serverCall";
import { ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: getRequest(),
    },
    mutations: {
      mutationFn: mutationRequest(),
    },
  },
});

const AppProviders = ({ children }: Props) => {
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          rtl
          theme="colored"
        />
      </QueryClientProvider>
    </AppThemeProvider>
  );
};

export default AppProviders;
