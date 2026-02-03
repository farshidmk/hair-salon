import { JALALI_MONTHS } from "@/services/dayjs";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const MonthPicker = ({ currentDate, onSelect }: { currentDate: dayjs.Dayjs; onSelect: (month: number) => void }) => (
  <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
    {JALALI_MONTHS.map((month, index) => (
      <Box
        key={month}
        onClick={() => onSelect(index)}
        sx={{
          p: 2,
          textAlign: "center",
          borderRadius: 2,
          cursor: "pointer",
          bgcolor: index === currentDate.month() ? "primary.main" : "action.hover",
          color: index === currentDate.month() ? "primary.contrastText" : "text.primary",
        }}
      >
        {month}
      </Box>
    ))}
  </Box>
);

export default MonthPicker;
