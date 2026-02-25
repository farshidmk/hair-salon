import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import RoleBadgeList from "./RoleBadgeList";
import { Roles } from "@/shared/consts";

type Props = {
  fullName?: string;
  title: string;
  subtitle: string;
  roles: Roles[];
  primaryAction: {
    label: string;
    href: string;
  };
};

const DashboardHeader = ({ fullName, title, subtitle, roles, primaryAction }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 4 },
        borderRadius: 4,
        background: "linear-gradient(135deg, #0F172A 0%, #1D4ED8 45%, #0EA5E9 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.16)",
          top: -120,
          right: -80,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          bottom: -90,
          left: -60,
        }}
      />

      <Stack spacing={2} sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.88 }}>
          {fullName ? `سلام, ${fullName}` : "سلام"}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 680, opacity: 0.92 }}>
          {subtitle}
        </Typography>
        {roles.length > 0 && <RoleBadgeList roles={roles} />}
        <Box>
          <Button
            component={Link}
            href={primaryAction.href}
            variant="contained"
            sx={{
              mt: 1,
              borderRadius: 999,
              px: 3,
              py: 1,
              fontWeight: 700,
              bgcolor: "#fff",
              color: "#0F172A",
              "&:hover": {
                bgcolor: "#E2E8F0",
              },
            }}
          >
            {primaryAction.label}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DashboardHeader;
