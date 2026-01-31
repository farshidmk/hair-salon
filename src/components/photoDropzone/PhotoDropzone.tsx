import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";

/**
 * Props for PhotoDropzone
 * - value: the currently selected image as a File. If null/undefined, no image is shown and the dropzone is empty.
 * - onChange: called when user selects a new image or clears the current one.
 *             Pass a File to set a new image, or pass null to clear the current image.
 * - error: optional error message to display under the dropzone.
 *
 * Notes:
 * - This dropzone accepts a single image (image/*).
 * - When a file is provided via value, a preview is shown using an object URL.
 * - The object URL is automatically revoked when value changes or the component unmounts.
 */
type PhotoDropzoneProps = {
  value?: File | null;
  onChange: (file?: File | null) => void;
  error?: string;
};

export const PhotoDropzone: React.FC<PhotoDropzoneProps> = ({ value, onChange, error }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (files) => {
      if (files && files[0]) onChange?.(files[0]);
    },
  });

  // Preview URL for the current value
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!value) {
      // Clear preview when value is removed
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(undefined);
      }
      return;
    }

    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      // Cleanup the URL when the next value is chosen or on unmount
      return () => URL.revokeObjectURL(url);
    }
  }, [value]); // eslint-disable-line

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 180,
        gap: 2,
      }}
    >
      <input {...getInputProps()} />
      {value ? (
        <>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Uploaded"
              style={{
                width: "100px",
                height: "auto",
                maxHeight: "100px",
                objectFit: "cover",
              }}
            />
          )}
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            برای تغییر کلیک کنید
          </Typography>
          <Button variant="outlined" size="small" onClick={handleRemove}>
            حذف
          </Button>
        </>
      ) : (
        <>
          <Typography>{isDragActive ? "عکس را اینجا بندازید" : "عکس را اینجا بندازید یا انتخاب کنید"}</Typography>
          {error && (
            <Typography color="error" variant="caption">
              {error}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};
