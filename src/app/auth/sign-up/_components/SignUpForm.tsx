"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { SignUpFormItems } from "../signUp.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { UserRoundPlus } from "lucide-react";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormItems>({
    resolver: zodResolver(schema),
    defaultValues: {
      NationalCode: "123123",
    },
  });

  const { mutate, isPending } = useMutation<SignUpFormItems, Error, AxiosRequestConfig<Partial<SignUpFormItems>>>({});

  const onSubmit = async (data: SignUpFormItems) => {
    mutate({
      method: "post",
      url: "Account/Register",
      data,
    });
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom fontWeight={700}>
        ثبت نام کنید
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="نام"
          margin="normal"
          {...register("FirstName")}
          error={!!errors.FirstName}
          helperText={errors.FirstName?.message}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="نام خانوادگی"
          margin="normal"
          {...register("LastName")}
          error={!!errors.LastName}
          helperText={errors.LastName?.message}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="شماره تلفن"
          type="tel"
          margin="normal"
          {...register("Mobile")}
          error={!!errors.Mobile}
          helperText={errors.Mobile?.message}
          variant="outlined"
          placeholder="مثال: 09123456789"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          endIcon={isPending ? <CircularProgress size={18} /> : <UserRoundPlus />}
          disabled={isPending}
        >
          ثبت نام
        </Button>
      </form>
    </div>
  );
}

const schema = z.object({
  FirstName: z.string().min(1, "نام را وارد کنید").max(30, "نام نمیتواند بیشتر از 30 کاراکتر باشد"),
  LastName: z.string().min(1, "نام را وارد کنید").max(30, "نام نمیتواند بیشتر از 30 کاراکتر باشد"),
  Mobile: z
    .string()
    .min(1, "شماره تلفن خود را وارد کنید")
    .regex(/^09\d{9}$/, "شماره تلفن خود را به درستی وارد کنید مانند: 09123456789"),
  NationalCode: z.string(),
  // password: z.string().min(6, "رمز عبور باید حداقل شامل 6 کاراکتر باشد").max(30, "رمز نباید بیشتر از 30 کاراکتر باشد"),
});
