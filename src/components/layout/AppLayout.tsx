"use client";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isSmallScreen = useIsSmallScreen();
  return (
    <Box component="div" className="flex flex-col h-screen w-screen overflow-auto">
      <Header open={openDrawer} toggleSidebar={() => setOpenDrawer((p) => !p)} />
      <main className="flex-1 overflow-auto">{children}</main>
      {isSmallScreen && <h1>custom footer</h1>}
    </Box>
  );
};

export default AppLayout;
