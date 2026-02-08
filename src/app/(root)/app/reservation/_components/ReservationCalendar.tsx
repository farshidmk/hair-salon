"use client";

import { alpha, Autocomplete, Box, TextField, Typography } from "@mui/material";
import dayjs, { JALALI_MONTHS, JALALI_WEEK_DAYS } from "@/services/dayjs";
import { useState } from "react";
import { toPersianDigits } from "@/services/utils";
import { CalendarViewMode, getMonthDays, getStartOffset, isHoliday } from "@/components/customCalendar/CustomCalendar";
import MonthPicker from "@/components/customCalendar/MonthPicker";
import YearPicker from "@/components/customCalendar/YearPicker";
import { useQuery } from "@tanstack/react-query";
import { PaginatedServerResponse } from "@/types/server";
import { ServiceWithId } from "../../manager/services/service.types";
import { DEFAULT_COMPANY_ID, ULTIMATE_PAGINATION_QUERY } from "@/shared/consts";
import StatusHandler from "@/components/statusHandler/StatusHandler";

const ReservationCalendar = () => {
  const [selectedService, setSelectedService] = useState<ServiceWithId | null>(null);
  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  const [currentDate, setCurrentDate] = useState(dayjs().calendar("jalali"));
  const [yearRangeStart, setYearRangeStart] = useState(1370);
  const today = dayjs().calendar("jalali");
  const days = getMonthDays(today);
  const offset = getStartOffset(today);

  const {
    data: services,
    status: servicesStatus,
    refetch: servicesRefetch,
  } = useQuery<PaginatedServerResponse<ServiceWithId>, Error, PaginatedServerResponse<ServiceWithId>>({
    queryKey: ["Service", ULTIMATE_PAGINATION_QUERY],
  });
  const {
    data: timeReservation,
    status: timeReservationStatus,
    refetch: timeReservationRefetch,
  } = useQuery({
    queryKey: [
      "TimeSlot",
      "SlotGetServiceTimeReserved",
      `?serviceId=${selectedService?.id}&year=${2024}&month=${currentDate.month()}&companyId=${DEFAULT_COMPANY_ID}`,
    ],
    enabled: Boolean(selectedService?.id),
  });

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
      <div className="w-full mt-2 flex-1">
        <StatusHandler status={servicesStatus} refetch={servicesRefetch} skeletonHeight={20} showLinearProgress>
          <Autocomplete
            options={services?.data?.items ?? []}
            getOptionKey={(option: ServiceWithId) => option.id}
            getOptionLabel={(option: ServiceWithId) => option.title}
            renderInput={(params) => <TextField {...params} label="سرویس" placeholder="انتخاب سرویس ها" />}
            fullWidth
            value={selectedService}
            onChange={(e, v) => {
              setSelectedService(v);
            }}
          />
        </StatusHandler>
      </div>
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

export default ReservationCalendar;
