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
  const { data: userInfo, status: tokenStatus } = useQuery<LoggedInUser | null, Error, LoggedInUser | null>({
    queryKey: ["check token"],
    queryFn: getTokenInfo,
  });
  return (
    <Box>
      <AppBar position="static">
        <Toolbar className="flex justify-between w-full">
          <div className="flex-1 flex justify-start">
            {tokenStatus === "pending" ? (
              <CircularProgress />
            ) : userInfo ? (
              <div className="flex items-center gap-1 justify-center">
                <IconButton>
                  <Avatar />
                </IconButton>
                <div className="flex flex-col gap-0.5">
                  <Typography variant="body1">{userInfo.surname}</Typography>
                </div>
              </div>
            ) : (
              <Link href="/auth/login">
                <IconButton sx={{ color: "white" }}>
                  <LoginIcon />
                </IconButton>
              </Link>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <Typography className="">Hair Salon Name</Typography>
          </div>
          <div className="flex-1 flex justify-end">
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => toggleSidebar()}>
              <AlignJustify />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
