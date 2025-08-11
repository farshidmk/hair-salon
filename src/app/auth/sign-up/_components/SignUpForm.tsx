"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { SignUpFormItems } from "../signUp.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SALON_NAME } from "@/shared/global";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormItems>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignUpFormItems) => {
    try {
      console.log("Form Data:", data);
      // Example: await fetch('/api/signup', { method: 'POST', body: JSON.stringify(data) });
      alert("Sign-up successful!");
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <div>
      <Typography variant="h6" fontWeight={600} textAlign="center" color="primary">
        {SALON_NAME}
      </Typography>
      <div className="border-2 p-4 rounded-xl border-primary max-w-sm bg-white/60 backdrop-blur-3xl">
        <Typography variant="h5" align="center" gutterBottom fontWeight={700}>
          ثبت نام کنید
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="نام"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="شماره تلفن"
            type="tel"
            margin="normal"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            variant="outlined"
            placeholder="مثال: 09123456789"
          />
          <TextField
            fullWidth
            label="رمز عبور"
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            ثبت نام
          </Button>
        </form>
      </div>
    </div>
  );
}

const schema = z.object({
  name: z.string().min(1, "نام را وارد کنید").max(30, "نام نمیتواند بیشتر از 30 کاراکتر باشد"),
  phoneNumber: z
    .string()
    .min(1, "شماره تلفن خود را وارد کنید")
    .regex(/^09\d{9}$/, "شماره تلفن خود را به درستی وارد کنید مانند: 09123456789"),
  password: z.string().min(6, "رمز عبور باید حداقل شامل 6 کاراکتر باشد").max(30, "رمز نباید بیشتر از 30 کاراکتر باشد"),
});
