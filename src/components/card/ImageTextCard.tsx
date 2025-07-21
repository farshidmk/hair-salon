// components/ImageTextCard.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface ImageTextCardProps {
  image: string;
  text: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
}

const ImageTextCard: React.FC<ImageTextCardProps> = ({ image, text, containerClassName = "h-48", textClassName }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        px: 2,
      }}
      component="div"
      className={containerClassName}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.4)",
        }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: "absolute",
          zIndex: 1,
          fontWeight: "bold",
        }}
        className={textClassName}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default ImageTextCard;
