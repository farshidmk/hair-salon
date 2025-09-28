export type LoginFormPhoneNumber = {
  PhoneNumber: string;
};

export type OtpLoginForm = {
  TotpCode: string;
  UserId: string;
};

export type LoginResponse = {
  Expiration: string;
  RefreshToken: string;
  Token: string;
};
