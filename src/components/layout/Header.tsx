"use client";

import useGetUserInfo from "@/hooks/useGetUserInfo";
import LoginIcon from "@mui/icons-material/Login";
import { CircularProgress, Tooltip, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import LoggedInUserAvatar from "./LoggedInUserAvatar";

type Props = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: Props) => {
  const { data: userInfo, status: tokenStatus } = useGetUserInfo();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className="flex justify-between w-full">
          <div className="flex-1 flex justify-start">
            {tokenStatus === "pending" ? (
              <CircularProgress />
            ) : userInfo ? (
              <LoggedInUserAvatar />
            ) : (
              <Link href="/auth/login">
                <Tooltip title="ورود">
                  <IconButton
                    aria-label="login"
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.6)",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: 2,
                      px: 1.25,
                      py: 0.75,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderColor: "rgba(255,255,255,0.95)",
                      },
                    }}
                  >
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <Typography>{process.env.NEXT_PUBLIC_HAIR_SALON_NAME}</Typography>
          </div>
          <div className="flex-1 flex justify-end">
            {userInfo && (
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => toggleSidebar()}>
                <AlignJustify />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
