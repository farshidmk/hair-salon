import OTPInput from "@/components/otpInput/OtpInput";
import { Button, CircularProgress, InputAdornment, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ServerCall } from "@/types/server";
import { LoginFormPhoneNumber } from "../login.types";
import SendIcon from "@mui/icons-material/Send";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isLoading, errors },
    getValues,
  } = useForm<LoginFormPhoneNumber>({
    resolver: zodResolver(persianPhoneSchema),
  });
  const [step, setStep] = useState<"phoneNumber" | "otp">("phoneNumber");
  const { mutate: mutatePhoneNumber, isPending: isPendingPhoneNumber } = useMutation<
    ServerCall<LoginFormPhoneNumber>,
    Error,
    ServerCall<LoginFormPhoneNumber>
  >({});
  const { mutate: mutateOtp } = useMutation<ServerCall<LoginFormPhoneNumber>, Error, ServerCall<LoginFormPhoneNumber>>(
    {}
  );
  function onSubmit({ PhoneNumber }: LoginFormPhoneNumber) {
    mutatePhoneNumber(
      {
        method: "POST",
        url: "Account/SendTotpCode",
        data: { PhoneNumber },
      },
      {
        onSuccess: () => setStep("otp"),
      }
    );
  }

  return (
    <div>
      {step === "phoneNumber" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6">شماره همراه خود را وارد کنید</Typography>
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
          />
          <div className="w-full flex justify-center pt-4">
            <Button
              onClick={() => handleSubmit(onSubmit)()}
              endIcon={isPendingPhoneNumber ? <CircularProgress size={18} /> : <SendIcon />}
              color="primary"
              variant="contained"
              disabled={isPendingPhoneNumber}
            >
              ارسال کد
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <Typography variant="body1" textAlign="center">
            کد وارد شده به شماره {getValues("PhoneNumber")}
          </Typography>
          <OTPInput length={6} onChange={(e) => console.log({ e })} />
        </div>
      )}
    </div>
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
