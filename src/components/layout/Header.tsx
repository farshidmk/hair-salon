"use client";
import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { AlignJustify } from "lucide-react";
import { Avatar, Typography } from "@mui/material";

type Props = {
  toggleSidebar: () => void;
};
const Header = ({ toggleSidebar }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          {/* TODO: check user is logged in and show user's info */}
          <Avatar />
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
