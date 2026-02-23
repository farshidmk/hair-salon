"use client";

import { alpha, Backdrop, Paper } from "@mui/material";
import MonthPicker from "@/components/customCalendar/MonthPicker";
import YearPicker from "@/components/customCalendar/YearPicker";
import { useCalendar } from "@/providers/CalendarProvider";

const CalendarPickerOverlay = () => {
  const { viewMode, setViewMode, currentDate, yearRangeStart, setYearRangeStart, selectMonth, selectYear } =
    useCalendar();

  return (
    <Backdrop
      open={viewMode !== "day"}
      onClick={() => setViewMode("day")}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: (theme) => alpha(theme.palette.common.black, 0.45),
        backdropFilter: "blur(2px)",
      }}
    >
      <Paper
        elevation={0}
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: { xs: "calc(100% - 32px)", sm: 520 },
          maxWidth: "100%",
          p: 2,
          borderRadius: 3,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {viewMode === "month" ? (
          <MonthPicker currentDate={currentDate} onSelect={selectMonth} />
        ) : (
          <YearPicker
            currentYear={currentDate.year()}
            startYear={yearRangeStart}
            onPrev={() => setYearRangeStart((y) => y - 12)}
            onNext={() => setYearRangeStart((y) => y + 12)}
            onSelect={selectYear}
          />
        )}
      </Paper>
    </Backdrop>
  );
};

export default CalendarPickerOverlay;
