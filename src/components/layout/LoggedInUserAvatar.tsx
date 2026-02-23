import useIsSmallScreen from "@/hooks/useIsSmallScreen";
import { Avatar, Box, Popover, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/services/cookies";
import { useRouter } from "next/navigation";
import { clearAuthTokens } from "@/services/authToken";
import { LoggedInUser } from "@/types/user";

type Props = {
  userInfo: LoggedInUser;
};

const LoggedInUserAvatar = ({ userInfo }: Props) => {
  const router = useRouter();
  const isSmallScreen = useIsSmallScreen();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="flex items-center gap-1 justify-center">
      <IconButton onClick={(e) => handleClick(e)}>
        <Avatar />
      </IconButton>
      {!isSmallScreen && (
        <div className="flex flex-col gap-0.5">
          <Typography variant="body1">{userInfo.surname}</Typography>
        </div>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box component="div" className="flex flex-col gap-1 px-4 py-2 w-52">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={async () => {
              try {
                await logout();
                clearAuthTokens();
                router.push("/");
                handleClose();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Typography variant="body2" color="error">
              خروج
            </Typography>
            <LogoutIcon color="error" />
          </div>
        </Box>
      </Popover>
    </div>
  );
};

export default LoggedInUserAvatar;
