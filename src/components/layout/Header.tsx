"use client";

import useGetUserInfo from "@/hooks/useGetUserInfo";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, CircularProgress, Tooltip, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

type Props = {
  toggleSidebar: () => void;
};
const Header = ({ toggleSidebar }: Props) => {
  const { data: userInfo, status: tokenStatus } = useGetUserInfo();
  const isSmallScreen = useIsSmallScreen();

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
                {!isSmallScreen && (
                  <div className="flex flex-col gap-0.5">
                    <Typography variant="body1">{userInfo.surname}</Typography>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login">
                <Tooltip title="ورود">
                  <IconButton sx={{ color: "white" }}>
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <Typography className="">{process.env.NEXT_PUBLIC_HAIR_SALON_NAME}</Typography>
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
