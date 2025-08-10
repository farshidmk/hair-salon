"use client";

import useCustomTheme from "@/hooks/useCustomTheme";
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

type Props = {
  children: React.ReactNode;
};

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       queryFn: getRequest,
//     },

//     mutations: {
//       mutationFn: serverCall,
//     },
//   },
// });

const AppThemeProvider = ({ children }: Props) => {
  const theme = useCustomTheme();

  // const serverCall: MutationFunction<unknown, unknown> = async (variables) => {
  //   const { entity, method, data } = variables as ServerCallType;
  //   try {
  //     const requestOptions: AxiosRequestConfig = {
  //       url: entity,
  //       method,
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //       data,
  //     };
  //     const response = await api({ ...requestOptions });
  //     if (response?.status === 200) {
  //       return response?.data;
  //     } else if (response?.status === 204) {
  //       return { data: { rows: [] } };
  //     } else {
  //       throw new Error(`Error on operation... - ${response?.statusText}`);
  //     }
  //   } catch (e) {
  //     if (isServerError(e) && e.response?.status === 400) {
  //       let tempError = e.response.data;
  //       throw tempError;
  //     }
  //     throw new Error(JSON.stringify(e) || `Error on operation...`);
  //   }
  // };

  // const getRequest: QueryFunction<unknown, QueryKey, never> = async ({ queryKey }: { queryKey: QueryKey }) => {
  //   let tempEntity = "";
  //   if (Array.isArray(queryKey)) {
  //     tempEntity = queryKey.join("/");
  //   }
  //   tempEntity = String(tempEntity);
  //   try {
  //     return await serverCall({ entity: tempEntity, method: "get" });
  //   } catch (error: any) {
  //     throw new Error(error?.message || `Error on Fetching Da`);
  //   }
  // };
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          // queries,
        },
      })
  );
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <main>{children}</main>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
};

export default AppThemeProvider;
