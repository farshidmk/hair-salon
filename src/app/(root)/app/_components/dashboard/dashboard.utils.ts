import MENU_ITEMS from "@/shared/menuItems";
import { PATHS } from "@/shared/path";
import { Roles } from "@/shared/consts";
import { BellRing, BriefcaseBusiness, CalendarCheck, Scissors, ShieldCheck, Sparkles, Users } from "lucide-react";
import { DashboardHeaderContent, DashboardQuickAction, DashboardStat } from "./dashboard.types";

const hasAccess = (userRoles: Roles[] = [], itemRoles: Roles[]) => itemRoles.some((role) => userRoles.includes(role));

export const getQuickActions = (userRoles: Roles[]): DashboardQuickAction[] => {
  const collected: DashboardQuickAction[] = [];
  const visited = new Set<string>();

  MENU_ITEMS.filter((menu) => hasAccess(userRoles, menu.roles)).forEach((menu) => {
    if (menu.subMenu?.length) {
      menu.subMenu
        .filter((sub) => hasAccess(userRoles, sub.roles))
        .forEach((sub) => {
          if (visited.has(sub.path)) {
            return;
          }
          visited.add(sub.path);
          collected.push({
            id: sub.path,
            label: sub.label,
            description: sub.description ?? "توضیحات مربوط به منو",
            href: sub.path,
            icon: sub.icon,
          });
        });
      return;
    }

    if (visited.has(menu.path)) {
      return;
    }

    visited.add(menu.path);
    collected.push({
      id: menu.path,
      label: menu.label,
      description: menu.description ?? "توضیحات مربوط به منو",
      href: menu.path,
      icon: menu.icon,
    });
  });

  return collected.slice(0, 8);
};

export const getHeaderContent = (userRoles: Roles[]): DashboardHeaderContent => {
  if (userRoles.includes(Roles.Admin)) {
    return {
      title: "System Overview Dashboard",
      subtitle: "Monitor users, business operations, and booking flow from one place.",
    };
  }

  if (userRoles.includes(Roles.Manager)) {
    return {
      title: "Salon Management Dashboard",
      subtitle: "Track team activity, services, and reservation health in real time.",
    };
  }

  if (userRoles.includes(Roles.Stylist)) {
    return {
      title: "Stylist Workspace",
      subtitle: "Review your schedule, service readiness, and client activity.",
    };
  }

  return {
    title: "Welcome Back",
    subtitle: "Plan your next visit and manage your reservations quickly.",
  };
};

export const getStats = (userRoles: Roles[]): DashboardStat[] => {
  const common: DashboardStat[] = [
    {
      id: "bookings",
      label: "Today Bookings",
      value: "24",
      change: "+8.5%",
      trend: "up",
      icon: CalendarCheck,
      color: "#0EA5E9",
    },
    {
      id: "services",
      label: "Active Services",
      value: "18",
      change: "+2",
      trend: "up",
      icon: Scissors,
      color: "#F97316",
    },
  ];

  if (userRoles.includes(Roles.Admin)) {
    return [
      ...common,
      {
        id: "users",
        label: "Total Users",
        value: "1,240",
        change: "+12.2%",
        trend: "up",
        icon: Users,
        color: "#8B5CF6",
      },
      {
        id: "systemHealth",
        label: "System Health",
        value: "99.9%",
        change: "Stable",
        trend: "neutral",
        icon: ShieldCheck,
        color: "#22C55E",
      },
    ];
  }

  if (userRoles.includes(Roles.Manager)) {
    return [
      ...common,
      {
        id: "team",
        label: "Team Capacity",
        value: "84%",
        change: "+4.1%",
        trend: "up",
        icon: BriefcaseBusiness,
        color: "#14B8A6",
      },
      {
        id: "feedback",
        label: "Client Satisfaction",
        value: "4.9/5",
        change: "+0.2",
        trend: "up",
        icon: Sparkles,
        color: "#EAB308",
      },
    ];
  }

  return [
    {
      id: "nextReservation",
      label: "Next Reservation",
      value: "2:30 PM",
      change: "Today",
      trend: "neutral",
      icon: CalendarCheck,
      color: "#0EA5E9",
    },
    {
      id: "favoriteServices",
      label: "Favorite Services",
      value: "3",
      change: "Updated",
      trend: "neutral",
      icon: Scissors,
      color: "#F97316",
    },
    {
      id: "offers",
      label: "Available Offers",
      value: "5",
      change: "+1 new",
      trend: "up",
      icon: BellRing,
      color: "#8B5CF6",
    },
    {
      id: "loyalty",
      label: "Loyalty Status",
      value: "Gold",
      change: "Top tier",
      trend: "up",
      icon: Sparkles,
      color: "#EAB308",
    },
  ];
};

export const getHighlights = (userRoles: Roles[]): string[] => {
  if (userRoles.includes(Roles.Admin)) {
    return [
      "Review new user registrations and role assignments.",
      "Validate reservation processing with latest system changes.",
      "Check platform health and daily operational KPIs.",
    ];
  }

  if (userRoles.includes(Roles.Manager)) {
    return [
      "Confirm upcoming reservations and staff availability.",
      "Refresh service catalog and pricing where needed.",
      "Track customer feedback and peak-hour workload.",
    ];
  }

  return [
    "Check your next reservation details.",
    "Explore available services before booking.",
    "Use quick actions to manage appointments faster.",
  ];
};

export const getPrimaryAction = (userRoles: Roles[]): { label: string; href: string } => {
  if (userRoles.includes(Roles.Admin)) {
    return { label: "Manage Users", href: PATHS.Admin.Users };
  }
  if (userRoles.includes(Roles.Manager)) {
    return { label: "View Reservations", href: PATHS.Manager.Reservation };
  }

  return { label: "Book Reservation", href: PATHS.App.Reservation };
};
