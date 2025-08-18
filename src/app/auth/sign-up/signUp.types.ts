export type SignUpFormItems = {
  FirstName: string;
  LastName: string;
  Mobile: string;
  NationalCode: string;
};
export type SignUpFormWithOtp = SignUpFormItems & {
  otp: string;
};
