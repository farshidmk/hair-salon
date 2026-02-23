import CountdownButton from "@/app/auth/login/_components/CountDownButton";
import OTPInput from "@/components/otpInput/OtpInput";
import { setAuthTokens } from "@/services/authToken";
import { ServerCall, ServerResponse } from "@/types/server";
import { Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginResponse, OtpLoginForm } from "../login.types";

type Props = {
  phoneNumber: string;
  userId: string;
};

const OtpInputForm = ({ phoneNumber, userId }: Props) => {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState<string>("");
  const { mutate, isPending } = useMutation<ServerResponse<LoginResponse>, Error, ServerCall<OtpLoginForm>>({});

  async function sendOtp(code: string) {
    mutate(
      {
        method: "POST",
        url: "Account/VerifyTotpCode",
        data: {
          TotpCode: code ?? otpCode,
          UserId: userId,
        },
      },
      {
        onSuccess: async (res) => {
          if (res.succeeded) {
            setAuthTokens(res.data.token, res.data.refreshToken);
            router.push("/app");
          }
        },
      }
    );
  }

  return (
    <div className="min-h-48 flex flex-col gap-1">
      <Typography variant="body1" fontWeight={600} textAlign="center" gutterBottom color="secondary">
        کد ارسال شده به شماره {phoneNumber} را وارد کنید
      </Typography>
      <div className="flex items-center justify-center gap-2">
        <OTPInput
          length={6}
          onChange={(code) => {
            if (code.length === 6) {
              setOtpCode(code);
              sendOtp(code);
            }
          }}
        />
        <div className="flex-1 min-w-32">
          <CountdownButton phoneNumber={phoneNumber} />
        </div>
      </div>
      <div className="flex-1" />
      <Button
        variant="outlined"
        endIcon={<BadgeCheck />}
        onClick={() => sendOtp(otpCode)}
        disabled={otpCode.length !== 6}
        fullWidth
        loading={isPending}
      >
        تایید
      </Button>
    </div>
  );
};

export default OtpInputForm;
