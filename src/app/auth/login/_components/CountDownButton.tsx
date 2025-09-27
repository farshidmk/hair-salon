import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useMutation } from "@tanstack/react-query";
import { LoginFormPhoneNumber } from "../login.types";
import { ServerCall, ServerResponse } from "@/types/server";
import { CircularProgress } from "@mui/material";

type Props = {
  phoneNumber: string;
};

const initialTimeLeft = 120; // 2 minutes in seconds

const CountdownButton = ({ phoneNumber }: Props) => {
  const { mutate, isPending } = useMutation<
    ServerResponse<LoginFormPhoneNumber>,
    Error,
    ServerCall<LoginFormPhoneNumber>
  >({});

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Button
      variant="contained"
      color="info"
      disabled={timeLeft >= 0}
      endIcon={isPending ? <CircularProgress size={18} /> : <RefreshIcon />}
      onClick={() =>
        mutate(
          {
            method: "POST",
            url: "Account/SendTotpCode",
            data: {
              PhoneNumber: phoneNumber,
            },
          },
          {
            onSuccess: () => {
              setTimeLeft(initialTimeLeft);
            },
          }
        )
      }
      fullWidth
    >
      {timeLeft > 0 ? formatTime(timeLeft) : "ارسال مجدد کد"}
    </Button>
  );
};

export default CountdownButton;
