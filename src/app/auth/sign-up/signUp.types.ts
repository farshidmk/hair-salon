export type SignUpFormItems = {
  name: string;
  phoneNumber: string;
  password: string;
};
export type SignUpFormWithOtp = SignUpFormItems & {
  otp: string;
};
