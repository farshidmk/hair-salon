export type LoginFormPhoneNumber = {
  PhoneNumber: string;
};

export type OtpLoginForm = {
  TotpCode: string;
  UserId: string;
};

export type LoginResponse = {
  expiration: string;
  refreshToken: string;
  token: string;
};
