"use client";

import useGetUserInfo from "@/hooks/useGetUserInfo";
import MENU_ITEMS from "@/shared/menuItems";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Roles } from "@/shared/consts";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const LeftMenu = ({ open, handleClose }: Props) => {
  const { data } = useGetUserInfo();
  const userRoles = data?.role as Roles[];
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 300, height: "100vh", display: "flex", flexDirection: "column" }}>
        <Box p={2}>
          <Typography variant="h6" textAlign="center" color="primary">
            {process.env.NEXT_PUBLIC_HAIR_SALON_NAME}
          </Typography>
        </Box>

        <List sx={{ flex: 1, overflow: "auto" }}>
          {MENU_ITEMS.filter((menu) => hasAccess(userRoles, menu.roles)).map((menu) => {
            const active = isActive(menu.path);
            const hasSubMenu = !!menu.subMenu?.length;
            const openSub = openMenus[menu.path] || active;

            return (
              <React.Fragment key={menu.path}>
                <ListItemButton
                  component={hasSubMenu ? "div" : Link}
                  href={!hasSubMenu ? menu.path : undefined}
                  onClick={() => {
                    if (hasSubMenu) {
                      toggleMenu(menu.path);
                    } else {
                      handleClose();
                    }
                  }}
                  selected={active}
                  sx={{
                    bgcolor: active ? "action.selected" : "transparent",
                  }}
                >
                  {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
                  <ListItemText primary={menu.label} />
                  {hasSubMenu && (openSub ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                {hasSubMenu && (
                  <Collapse in={openSub} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {menu
                        .subMenu!.filter((sub) => hasAccess(userRoles, sub.roles))
                        .map((sub) => {
                          const subActive = isActive(sub.path);

                          return (
                            <ListItemButton
                              key={sub.path}
                              component={Link}
                              href={sub.path}
                              selected={subActive}
                              sx={{
                                pl: 4,
                                bgcolor: subActive ? "action.selected" : "transparent",
                              }}
                            >
                              {sub.icon && <ListItemIcon>{sub.icon}</ListItemIcon>}
                              <ListItemText primary={sub.label} />
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;

const hasAccess = (userRoles: Roles[] = [], itemRoles: Roles[]) =>
  itemRoles.some((role) => {
    console.log({ userRoles, role });
    return userRoles.includes(role);
  });
