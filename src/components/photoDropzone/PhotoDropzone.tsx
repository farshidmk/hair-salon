import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

type Props = {
  value?: File;
  onChange: (file: File) => void;
  error?: string;
};

export const PhotoDropzone = ({ onChange, error }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (files) => {
      if (files[0]) onChange(files[0]);
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed",
        borderColor: error ? "error.main" : "grey.400",
        p: 3,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: 2,
      }}
    >
      <input {...getInputProps()} />
      <Typography>{isDragActive ? "عکس را اینجا بندازید" : "عکس را اینجا بندازید یا انتخاب کنید"}</Typography>
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
};
