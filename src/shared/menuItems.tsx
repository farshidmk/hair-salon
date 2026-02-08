import { ShieldUser, Scissors, Highlighter, UsersRound, UserCog, BookMarked } from "lucide-react";
import { PATHS } from "./path";
import { MenuItem } from "@/types/layout";
import { Roles } from "./consts";

const MENU_ITEMS: MenuItem[] = [
  {
    label: "مدیر سالن",
    path: PATHS.Manager.Root,
    icon: <ShieldUser />,
    roles: [Roles.Admin, Roles.Manager],
    subMenu: [
      {
        label: "آرایشگران",
        path: PATHS.Manager.Barbers,
        icon: <Scissors />,
        roles: [Roles.Admin, Roles.Manager],
      },
      {
        label: "سرویس ها",
        path: PATHS.Manager.Services,
        icon: <Highlighter />,
        roles: [Roles.Admin, Roles.Manager],
      },
      {
        label: "کاربران",
        path: PATHS.Manager.Users,
        icon: <UsersRound />,
        roles: [Roles.Admin, Roles.Manager],
      },
    ],
  },
  {
    label: "مدیر سیستم",
    path: PATHS.Admin.Root,
    icon: <UserCog />,
    roles: [Roles.Admin],
    subMenu: [
      {
        label: "کاربران",
        path: PATHS.Admin.Users,
        icon: <UsersRound />,
        roles: [Roles.Admin],
      },
    ],
  },
  {
    label: "رزرواسیون",
    path: PATHS.App.Reservation,
    icon: <BookMarked />,
    roles: [Roles.Admin, Roles.Customer, Roles.Manager],
  },
];

export default MENU_ITEMS;
