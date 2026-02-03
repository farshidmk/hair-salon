"use client";

import { alpha, Box, Typography } from "@mui/material";
import dayjs, { JALALI_MONTHS, JALALI_WEEK_DAYS } from "@/services/dayjs";
import { useState } from "react";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import { toPersianDigits } from "@/services/utils";

//TODO: check holidays
// https://pnldev.com/api/calender?year=1404&holiday=true

type ViewMode = "day" | "month" | "year";
const CustomCalendar = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [currentDate, setCurrentDate] = useState(dayjs().calendar("jalali"));
  const [yearRangeStart, setYearRangeStart] = useState(1370);
  const today = dayjs().calendar("jalali");
  const days = getMonthDays(today);
  const offset = getStartOffset(today);

  if (viewMode === "month") {
    return (
      <MonthPicker
        currentDate={currentDate}
        onSelect={(month) => {
          setCurrentDate(currentDate.month(month));
          setViewMode("day");
        }}
      />
    );
  }

  if (viewMode === "year") {
    return (
      <YearPicker
        currentYear={currentDate.year()}
        startYear={yearRangeStart}
        onPrev={() => setYearRangeStart((y) => y - 12)}
        onNext={() => setYearRangeStart((y) => y + 12)}
        onSelect={(year) => {
          setCurrentDate(currentDate.year(year));
          setViewMode("day");
        }}
      />
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="center" gap={1} mb={2}>
        <Typography
          fontWeight={600}
          sx={{ cursor: "pointer" }}
          onClick={() => setViewMode("month")}
          color="primary.main"
        >
          {JALALI_MONTHS[currentDate.month()]}
        </Typography>

        <Typography fontWeight={600} sx={{ cursor: "pointer" }} onClick={() => setViewMode("year")} color="info.main">
          {toPersianDigits(currentDate.year())}
        </Typography>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {JALALI_WEEK_DAYS.map((day, i) => (
          <Typography key={day} textAlign="center" fontWeight={600} color={i === 6 ? "error.main" : "text.primary"}>
            {day}
          </Typography>
        ))}

        {/* Empty cells */}
        {Array.from({ length: offset }).map((_, i) => (
          <Box key={`empty-${i}`} />
        ))}

        {/* Days */}
        {days.map((day) => (
          <Box
            key={day.format("YYYY-MM-DD")}
            sx={{
              textAlign: "center",
              p: 1,
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": { bgcolor: "action.hover" },
              fontWeight: 500,
              bgcolor: (t) => (isHoliday(day) ? alpha(t.palette.error.light, 0.3) : "transparent"),
              color: isHoliday(day) ? "error.main" : "text.primary",
            }}
          >
            {toPersianDigits(day.format("D"))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomCalendar;

const getMonthDays = (date: dayjs.Dayjs) => {
  const startOfMonth = date.startOf("month");
  const daysInMonth = date.daysInMonth();

  return Array.from({ length: daysInMonth }, (_, i) => startOfMonth.add(i, "day"));
};

const getStartOffset = (date: dayjs.Dayjs) => {
  // day(): 0 = Sunday ... 6 = Saturday
  // Convert to Persian week (Saturday = 0)
  const day = date.startOf("month").day();
  return (day + 1) % 7;
};

const isHoliday = (day: dayjs.Dayjs) => {
  // const jalaliStr = day.format("jYYYY/jMM/jDD");

  // check Friday
  if (day.day() === 5) return true;

  // check official holidays (from API or JSON)
  // if (holidaySet.has(jalaliStr)) return true;

  return false;
};
