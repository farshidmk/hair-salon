"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { AlignJustify } from "lucide-react";
import { Avatar, CircularProgress, Typography } from "@mui/material";
import { getTokenInfo } from "@/services/cookies";
import { useQuery } from "@tanstack/react-query";
import { LoggedInUser } from "@/types/user";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";

type Props = {
  toggleSidebar: () => void;
};
const Header = ({ toggleSidebar }: Props) => {
  const { data: token, status: tokenStatus } = useQuery<LoggedInUser | null, Error, LoggedInUser | null>({
    queryKey: ["check token"],
    queryFn: getTokenInfo,
  });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          {tokenStatus === "pending" ? (
            <CircularProgress />
          ) : token ? (
            <IconButton>
              <Avatar />
            </IconButton>
          ) : (
            <Link href="/auth/login">
              <IconButton sx={{ color: "white" }}>
                <LoginIcon />
              </IconButton>
            </Link>
          )}
          <Typography className="">Hair Salon Name</Typography>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => toggleSidebar()}>
            <AlignJustify />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
