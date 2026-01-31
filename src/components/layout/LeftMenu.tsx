import useGetUserInfo from "@/hooks/useGetUserInfo";
import { Box, Drawer, Typography } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const LeftMenu = ({ open, handleClose }: Props) => {
  useGetUserInfo();
  return (
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      <Box sx={{ width: "300px", display: "flex", flexDirection: "column" }}>
        <div className="w-full mb-2 p-2">
          <Typography variant="h6" textAlign={"center"} className="text-primary">
            {process.env.NEXT_PUBLIC_HAIR_SALON_NAME}
          </Typography>
        </div>
        <div className="flex flex-col gap-1 flex-1 overflow-auto"></div>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;

const MENU_ITEMS = [];
