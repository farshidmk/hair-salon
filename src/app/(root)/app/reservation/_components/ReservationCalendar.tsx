"use client";

import { alpha, Alert, Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import dayjs, { JALALI_MONTHS, JALALI_WEEK_DAYS } from "@/services/dayjs";
import { useState } from "react";
import { toPersianDigits } from "@/services/utils";
import { CalendarViewMode, getMonthDays, getStartOffset, isHoliday } from "@/components/customCalendar/CustomCalendar";
import MonthPicker from "@/components/customCalendar/MonthPicker";
import YearPicker from "@/components/customCalendar/YearPicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaginatedServerResponse, ServerResponse } from "@/types/server";
import { ServiceWithId } from "../../manager/services/service.types";
import { DEFAULT_COMPANY_ID, ULTIMATE_PAGINATION_QUERY } from "@/shared/consts";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { BarberListResponse } from "../../manager/barbers/barber.types";
import { AxiosRequestConfig } from "axios";

type TimeSpanItem = {
  id?: number;
  startTime: string;
  endTime: string;
  price: number;
  serviceId: number;
  userId: string;
};

type CreateTimeSpanPayload = {
  startTime: string;
  endTime: string;
  price: number;
  serviceId: number;
  userId: string;
};

type BarberWithUserId = BarberListResponse & {
  userId?: string;
};

const ReservationCalendar = () => {
  const [selectedService, setSelectedService] = useState<ServiceWithId | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<BarberWithUserId | null>(null);
  const [newTimeSpan, setNewTimeSpan] = useState({
    startTime: "",
    endTime: "",
    price: 1,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  const [currentDate, setCurrentDate] = useState(dayjs().calendar("jalali"));
  const [yearRangeStart, setYearRangeStart] = useState(1370);
  const georgianDate = currentDate.calendar("gregory");
  const days = getMonthDays(currentDate);
  const offset = getStartOffset(currentDate);

  const {
    data: services,
    status: servicesStatus,
    refetch: servicesRefetch,
  } = useQuery<PaginatedServerResponse<ServiceWithId>, Error, PaginatedServerResponse<ServiceWithId>>({
    queryKey: ["Service", ULTIMATE_PAGINATION_QUERY],
  });

  const {
    data: barbers,
    status: barbersStatus,
    refetch: barbersRefetch,
  } = useQuery<ServerResponse<BarberWithUserId[]>, Error, BarberWithUserId[]>({
    queryKey: ["UserCompanyService", "Getbarbers", String(selectedService?.id ?? "")],
    enabled: Boolean(selectedService?.id),
    select: (res) => res.data,
  });

  const {
    data: timeReservation,
    status: timeReservationStatus,
    refetch: timeReservationRefetch,
  } = useQuery<ServerResponse<TimeSpanItem[]>, Error, TimeSpanItem[]>({
    queryKey: [
      "TimeSlot",
      "SlotGetServiceTimeReserved",
      `?serviceId=${selectedService?.id}&year=${georgianDate.year()}&month=${georgianDate.month()}&companyId=${DEFAULT_COMPANY_ID}`,
    ],
    enabled: Boolean(selectedService?.id),
    select: (res) => res.data,
  });

  const {
    mutate: createTimeSpan,
    isPending: isCreateTimeSpanPending,
    data: createTimeSpanResult,
    error: createTimeSpanError,
  } = useMutation<ServerResponse<boolean>, Error, AxiosRequestConfig<CreateTimeSpanPayload>>({
    onSuccess: () => {
      setNewTimeSpan((prev) => ({ ...prev, startTime: "", endTime: "" }));
      setFormError(null);
      timeReservationRefetch();
    },
  });

  const handleCreateTimeSpan = () => {
    const selectedBarberUserId = selectedBarber?.userId ?? "";

    if (!selectedService?.id || !selectedBarber || !newTimeSpan.startTime || !newTimeSpan.endTime || !newTimeSpan.price) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (!selectedBarberUserId) {
      setFormError("Selected barber does not have a valid userId.");
      return;
    }

    if (newTimeSpan.endTime <= newTimeSpan.startTime) {
      setFormError("End time must be later than start time.");
      return;
    }

    setFormError(null);
    createTimeSpan({
      method: "post",
      url: "TimeSlot",
      data: {
        startTime: newTimeSpan.startTime,
        endTime: newTimeSpan.endTime,
        price: Number(newTimeSpan.price),
        serviceId: selectedService.id,
        userId: selectedBarberUserId,
      },
    });
  };

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
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatusHandler status={servicesStatus} refetch={servicesRefetch} skeletonHeight={20} showLinearProgress>
              <Autocomplete
                options={services?.data?.items ?? []}
                getOptionKey={(option: ServiceWithId) => option.id}
                getOptionLabel={(option: ServiceWithId) => option.title}
                renderInput={(params) => <TextField {...params} label="Service" placeholder="Select service" />}
                fullWidth
                value={selectedService}
                onChange={(_, value) => {
                  setSelectedService(value);
                  setSelectedBarber(null);
                  setFormError(null);
                  if (value) {
                    setNewTimeSpan((prev) => ({ ...prev, price: value.price || 1 }));
                  }
                }}
              />
            </StatusHandler>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <StatusHandler
              status={!Boolean(selectedService?.id) ? "success" : barbersStatus}
              refetch={barbersRefetch}
              skeletonHeight={20}
              showLinearProgress
            >
              <Autocomplete
                options={barbers ?? []}
                getOptionKey={(option: BarberWithUserId) => option.nationalCode}
                getOptionLabel={(option: BarberWithUserId) => `${option.firstName} ${option.lastName}`}
                renderInput={(params) => <TextField {...params} label="Barber" placeholder="Select barber" />}
                fullWidth
                disabled={!Boolean(selectedService?.id)}
                value={selectedBarber}
                onChange={(_, value) => {
                  setSelectedBarber(value);
                  setFormError(null);
                }}
              />
            </StatusHandler>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              type="time"
              label="Start time"
              value={newTimeSpan.startTime}
              onChange={(e) => setNewTimeSpan((prev) => ({ ...prev, startTime: e.target.value }))}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              type="time"
              label="End time"
              value={newTimeSpan.endTime}
              onChange={(e) => setNewTimeSpan((prev) => ({ ...prev, endTime: e.target.value }))}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              value={newTimeSpan.price}
              onChange={(e) =>
                setNewTimeSpan((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ height: "56px" }}
              loading={isCreateTimeSpanPending}
              onClick={handleCreateTimeSpan}
              disabled={!selectedService || !selectedBarber}
            >
              Add timespan
            </Button>
          </Grid>
        </Grid>

        {formError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {formError}
          </Alert>
        )}

        {createTimeSpanError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {createTimeSpanError.message}
          </Alert>
        )}

        {createTimeSpanResult?.succeeded && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Timespan created successfully.
          </Alert>
        )}
      </div>

      <Box mt={2}>
        <Typography fontWeight={600} mb={1}>
          Reserved timespans
        </Typography>

        <StatusHandler
          status={!Boolean(selectedService?.id) ? "success" : timeReservationStatus}
          refetch={timeReservationRefetch}
          skeletonHeight={100}
          showLinearProgress
        >
          {!selectedService?.id ? (
            <Typography color="text.secondary">Select a service first.</Typography>
          ) : !timeReservation?.length ? (
            <Typography color="text.secondary">No timespans registered for this service.</Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              {timeReservation.map((slot, index) => (
                <Box
                  key={`${slot.id ?? index}-${slot.startTime}-${slot.endTime}`}
                  sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1, p: 1 }}
                >
                  <Typography variant="body2">
                    {slot.startTime} - {slot.endTime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Price: {toPersianDigits(String(slot.price))}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </StatusHandler>
      </Box>

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

        {Array.from({ length: offset }).map((_, i) => (
          <Box key={`empty-${i}`} />
        ))}

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
