import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-primary to-pink-50 flex items-center justify-center">
      <div className="w-screen flex items-center justify-center min-h-screen  p-4">
        <div className="w-full max-w-xl shadow-2xl rounded-3xl">
          <div className="w-full rounded-2xl bg-white/50 backdrop-blur-md backdrop-saturate-125 shadow-xl p-4 border-2 border-primary min-h-56">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
