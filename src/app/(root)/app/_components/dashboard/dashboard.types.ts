import { Roles } from "@/shared/consts";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type DashboardQuickAction = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon?: ReactNode;
};

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
};

export type DashboardHeaderContent = {
  title: string;
  subtitle: string;
};

export type DashboardViewModel = {
  header: DashboardHeaderContent;
  stats: DashboardStat[];
  highlights: string[];
  userRoles: Roles[];
  quickActions: DashboardQuickAction[];
};
