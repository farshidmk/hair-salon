import { Box } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <Box
      component="main"
      className="flex justify-center items-center bg-gradient-to-t from-primary/70 to-primary/15 h-screen w-screen"
    >
      {children}
    </Box>
  );
};

export default AuthLayout;
