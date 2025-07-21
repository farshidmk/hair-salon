import { useMediaQuery, useTheme } from "@mui/material";

const useIsSmallScreen = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return isSmallScreen;
};

export default useIsSmallScreen;
