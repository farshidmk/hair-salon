import { Box, Paper, Stack, Typography } from "@mui/material";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { DashboardStat } from "./dashboard.types";

type Props = {
  stats: DashboardStat[];
};

const DashboardStatCards = ({ stats }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? ArrowUpRight : stat.trend === "down" ? ArrowDownRight : Minus;
        const trendColor = stat.trend === "down" ? "#DC2626" : stat.trend === "neutral" ? "#64748B" : "#16A34A";

        return (
          <Paper
            key={stat.id}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              bgcolor: "#fff",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: `${stat.color}1A`,
                  color: stat.color,
                }}
              >
                <Icon size={20} />
              </Box>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: trendColor }}>
                <TrendIcon size={16} />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  {stat.change}
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="h5" sx={{ mt: 1.5, fontWeight: 800 }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default DashboardStatCards;
