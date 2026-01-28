import { Alert, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ServerCall, ServerResponse } from "@/types/server";
import { LoginFormPhoneNumber } from "../login.types";
import SendIcon from "@mui/icons-material/Send";
import OtpInputForm from "./OtpInputForm";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<LoginFormPhoneNumber>({
    resolver: zodResolver(persianPhoneSchema),
  });
  const [step, setStep] = useState<"phoneNumber" | "otp">("phoneNumber");
  const {
    mutate: mutatePhoneNumber,
    isPending: isPendingPhoneNumber,
    data,
  } = useMutation<ServerResponse<string>, Error, ServerCall<LoginFormPhoneNumber>>({});

  function onSubmit({ PhoneNumber }: LoginFormPhoneNumber) {
    mutatePhoneNumber(
      {
        method: "POST",
        url: "Account/SendTotpCode",
        data: { PhoneNumber },
      },
      {
        onSuccess: (res) => {
          if (res.Succeeded) {
            setStep("otp");
          }
        },
      }
    );
  }
  return (
    <>
      {step === "phoneNumber" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-48 flex flex-col justify-between">
          <div>
            <Typography variant="h6" gutterBottom>
              شماره همراه خود را وارد کنید
            </Typography>
            <TextField
              label="شماره همراه"
              {...register("PhoneNumber")}
              type="tel"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroidIcon />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="09121234567"
              error={Boolean(errors.PhoneNumber?.message)}
              helperText={errors.PhoneNumber?.message}
              sx={{ mt: 1 }}
              disabled={isPendingPhoneNumber}
            />
          </div>
          {data && !data?.Succeeded && (
            <Alert severity="error" variant="filled" sx={{ mt: 1 }}>
              <ul>
                {data.ErrorList.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </Alert>
          )}
          <div className="flex-1" />
          <div className="w-full flex justify-center pt-4">
            <Button
              onClick={() => handleSubmit(onSubmit)()}
              endIcon={<SendIcon />}
              color="primary"
              variant="contained"
              loading={isPendingPhoneNumber}
            >
              ارسال کد
            </Button>
          </div>
        </form>
      ) : (
        <OtpInputForm phoneNumber={getValues("PhoneNumber")} userId={data?.Data ?? ""} />
      )}
    </>
  );
};

export default LoginForm;

const persianPhoneSchema = z.object({
  PhoneNumber: z
    .string()
    .regex(/^09[0-9]{9}$/, { message: "شماره تلفن معتبر نیست. شماره باید با 09 شروع شود و 11 رقم باشد." })
    .min(11, { message: "شماره تلفن باید 11 رقم باشد." }) // Optional extra validation
    .max(11, { message: "شماره تلفن باید 11 رقم باشد." }), // Optional extra validation
});
