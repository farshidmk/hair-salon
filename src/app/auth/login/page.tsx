"use client";
import React from "react";
import LoginForm from "./_components/LoginForm";
import { Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl    p-5 shadow-lg backdrop-blur-sm sm:p-7">
      <div className="pointer-events-none absolute -top-16 -left-14 h-36 w-36 rounded-full bg-primary/20 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-20 h-44 w-44 rounded-full bg-rose-200/40 blur-3xl" />

      <div className="relative z-10">
        <Typography variant="body2" className="text-xs tracking-[0.28em] text-primary/80">
          {process.env.NEXT_PUBLIC_HAIR_SALON_NAME}
        </Typography>
        <Typography variant="h6" className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
          ورود به رزرو سالن زیبایی
        </Typography>
        <Typography variant="body2" className="mt-2 mb-6 text-sm leading-6 text-slate-600">
          برای دریافت کد تایید، شماره همراه خود را وارد کنید.
        </Typography>

        <div className="rounded-xl border border-primary/20 bg-white/85 p-4 shadow-sm sm:p-5">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
