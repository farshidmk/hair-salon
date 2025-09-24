import React, { ChangeEvent, useState } from "react";
import { Box, TextField, Grid } from "@mui/material";

const OTPInput = ({ length = 6, onChange }: { length?: number; onChange: (value: string) => void }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = event.target.value;
    if (value.length > 1) return; // Prevent typing more than one character

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Focus next input if the current one is filled
    if (value && index < length - 1) {
      const nextElement = document.getElementById(`otp-${index + 1}`);
      nextElement?.focus();
    }

    // Pass the OTP value to the parent
    onChange(updatedOtp.join(""));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const prevElement = document.getElementById(`otp-${index - 1}`);
      prevElement?.focus();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={2} justifyContent="center" direction="row-reverse">
        {Array(length)
          .fill("")
          .map((_, index) => (
            <Grid size={Math.ceil(12 / length)} key={index}>
              <TextField
                id={`otp-${index}`}
                value={otp[index]}
                placeholder=" - "
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                  },
                }}
                variant="outlined"
                size="small"
                sx={{ textAlign: "center", borderRadius: "50%" }}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default OTPInput;
