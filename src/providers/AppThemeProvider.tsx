"use client";

import useCustomTheme from "@/hooks/useCustomTheme";
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
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

const AppThemeProvider = ({ children }: Props) => {
  const theme = useCustomTheme();
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <main>{children}</main>
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
};

export default AppThemeProvider;
