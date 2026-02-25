"use client";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { Box, Skeleton, Stack } from "@mui/material";
import React, { useMemo } from "react";
import DashboardHeader from "./_components/dashboard/DashboardHeader";
import DashboardHighlights from "./_components/dashboard/DashboardHighlights";
import DashboardQuickActions from "./_components/dashboard/DashboardQuickActions";
import DashboardStatCards from "./_components/dashboard/DashboardStatCards";
import { getHeaderContent, getHighlights, getPrimaryAction, getQuickActions, getStats } from "./_components/dashboard/dashboard.utils";

const AppPage = () => {
  const { data, isLoading } = useGetUserInfo();
  const userRoles = useMemo(() => data?.role ?? [], [data?.role]);

  const viewModel = useMemo(() => {
    return {
      header: getHeaderContent(userRoles),
      stats: getStats(userRoles),
      highlights: getHighlights(userRoles),
      quickActions: getQuickActions(userRoles),
      primaryAction: getPrimaryAction(userRoles),
    };
  }, [userRoles]);

  if (isLoading) {
    return (
      <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={200} />
          <Skeleton variant="rounded" height={110} />
          <Skeleton variant="rounded" height={110} />
        </Stack>
      </Box>
    );
  }

  const fullName = data?.surname ?? data?.mobilePhone;

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: 3,
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Stack spacing={2.5}>
        <DashboardHeader
          fullName={fullName}
          title={viewModel.header.title}
          subtitle={viewModel.header.subtitle}
          roles={userRoles}
          primaryAction={viewModel.primaryAction}
        />
        <DashboardStatCards stats={viewModel.stats} />
        <DashboardQuickActions actions={viewModel.quickActions} />
        <DashboardHighlights highlights={viewModel.highlights} />
      </Stack>
    </Box>
  );
};

export default AppPage;
