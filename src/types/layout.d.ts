import { Roles } from "@/shared/consts";

type MenuItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
  subMenu?: MenuItem[];
  roles: Roles[];
  description?: string;
};
