import { Box, Paper, Stack, Typography } from "@mui/material";
import { CheckCircle2, Sparkles } from "lucide-react";

type Props = {
  highlights: string[];
};

const DashboardHighlights = ({ highlights }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          xl: "1.4fr 1fr",
        },
        gap: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid #E2E8F0",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
          Today Focus
        </Typography>
        <Stack spacing={1.2}>
          {highlights.map((item) => (
            <Stack key={item} direction="row" spacing={1} alignItems="flex-start">
              <CheckCircle2 size={18} color="#2563EB" style={{ marginTop: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F8FAFC 100%)",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Sparkles size={18} color="#0EA5E9" />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Workspace Notes
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.8 }}>
          This dashboard is role-aware and synced with your menu permissions, so each user sees only relevant
          actions and context.
        </Typography>
      </Paper>
    </Box>
  );
};

export default DashboardHighlights;
