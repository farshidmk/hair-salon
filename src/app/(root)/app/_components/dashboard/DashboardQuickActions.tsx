import { Box, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DashboardQuickAction } from "./dashboard.types";

type Props = {
  actions: DashboardQuickAction[];
};

const DashboardQuickActions = ({ actions }: Props) => {
  if (actions.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
        میانبر
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {actions.map((action) => (
          <Paper
            key={action.id}
            component={Link}
            href={action.href}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              textDecoration: "none",
              color: "inherit",
              transition: "all 180ms ease",
              "&:hover": {
                borderColor: "#94A3B8",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                {action.icon && (
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "#F1F5F9",
                      color: "#0F172A",
                    }}
                  >
                    {action.icon}
                  </Box>
                )}
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{action.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </Box>
              </Stack>
              <ChevronRight size={18} />
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardQuickActions;
