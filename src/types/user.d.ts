import { Roles } from "@/shared/consts";

export type LoggedInUser = {
  surname: string;
  mobilePhone: string;
  role: Roles[];
};
