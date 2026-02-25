import { Roles } from "@/shared/consts";
import { Chip, Stack } from "@mui/material";

type Props = {
  roles: Roles[];
};

const RoleBadgeList = ({ roles }: Props) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {roles.map((role) => (
        <Chip
          key={role}
          size="small"
          label={role.toUpperCase()}
          sx={{
            bgcolor: "rgba(255,255,255,0.22)",
            color: "#fff",
            fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </Stack>
  );
};

export default RoleBadgeList;
