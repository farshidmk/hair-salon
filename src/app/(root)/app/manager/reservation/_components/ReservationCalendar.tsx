"use client";

import {
  alpha,
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import dayjs, { getPersianDateLabel, JALALI_MONTHS, JALALI_WEEK_DAYS } from "@/services/dayjs";
import { useMemo, useState } from "react";
import { toPersianDigits } from "@/services/utils";
import { CalendarViewMode, getMonthDays, getStartOffset, isHoliday } from "@/components/customCalendar/CustomCalendar";
import MonthPicker from "@/components/customCalendar/MonthPicker";
import YearPicker from "@/components/customCalendar/YearPicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaginatedServerResponse, ServerResponse } from "@/types/server";
import { DEFAULT_COMPANY_ID, ULTIMATE_PAGINATION_QUERY } from "@/shared/consts";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { ServiceWithId } from "../../services/service.types";
import { AxiosRequestConfig } from "axios";
import { BarberWithUserId, CreateTimeSpanPayload, TimeSpanItem } from "../managerReservation.types";
import { Controller, useForm } from "react-hook-form";
import { notify } from "@/services/toast";

type ReservationFormValues = {
  serviceId: number | null;
  barberId: string | null;
  startTime: string;
  endTime: string;
  price: number;
};

const getSlotDateKey = (slot: TimeSpanItem) => {
  const candidates = [slot.slotDate, slot.reservedDate, slot.date, slot.day, slot.startTime];

  for (const value of candidates) {
    if (!value) continue;
    const parsed = dayjs(value);
    if (parsed.isValid()) {
      return parsed.format("YYYY-MM-DD");
    }
  }

  return null;
};

const getTimeLabel = (value: string) => {
  const parsed = dayjs(value);
  if (parsed.isValid()) return parsed.format("HH:mm");
  if (value.includes("T")) {
    return value.split("T")[1]?.slice(0, 5) ?? value;
  }

  return value;
};

const ReservationCalendar = () => {
  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  /**
   * date for showing calendar
   */
  const [currentDate, setCurrentDate] = useState(dayjs().calendar("jalali"));
  /**
   * selectedDate from current calendar
   */
  const [selectedDate, setSelectedDate] = useState(dayjs().calendar("jalali").startOf("day"));
  const [yearRangeStart, setYearRangeStart] = useState(1370);

  const {
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    defaultValues: {
      serviceId: null,
      barberId: null,
      startTime: "",
      endTime: "",
      price: 1,
    },
  });

  const selectedService = watch("serviceId");
  const selectedBarber = watch("barberId");

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
    queryKey: ["UserCompanyService", "Getbarbers", String(selectedService ?? "")],
    enabled: Boolean(selectedService),
    select: (res) => res.data,
  });

  const {
    data: timeSlot,
    status: timeSlotStatus,
    refetch: timeSlotRefetch,
  } = useQuery<ServerResponse<TimeSpanItem[]>, Error, TimeSpanItem[]>({
    queryKey: [
      "TimeSlot",
      "SlotGetServiceTimeReserved",
      `?serviceId=${selectedService}&year=${currentDate.year()}&month=${currentDate.month() + 1}&companyId=${DEFAULT_COMPANY_ID}`,
    ],
    enabled: Boolean(selectedService),
    select: (res) => res.data,
  });

  const {
    mutate,
    isPending,
    error: createTimeSpanError,
  } = useMutation<ServerResponse<boolean>, Error, AxiosRequestConfig<CreateTimeSpanPayload>>({
    onSuccess: () => {
      resetField("startTime");
      resetField("endTime");
      clearErrors();
      timeSlotRefetch();
    },
  });

  const selectedDateKey = useMemo(() => selectedDate.calendar("gregory").format("YYYY-MM-DD"), [selectedDate]);

  const goToPrevMonth = () => {
    const month = currentDate.month();
    const next = month === 0 ? currentDate.year(currentDate.year() - 1).month(11) : currentDate.month(month - 1);
    setCurrentDate(next);
    setSelectedDate(next.date(1));
  };

  const goToNextMonth = () => {
    const month = currentDate.month();
    const next = month === 11 ? currentDate.year(currentDate.year() + 1).month(0) : currentDate.month(month + 1);
    setCurrentDate(next);
    setSelectedDate(next.date(1));
  };

  const slotsByDate = useMemo(() => {
    const counts = new Map<string, number>();

    for (const slot of timeSlot ?? []) {
      const key = getSlotDateKey(slot);
      if (!key) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return counts;
  }, [timeSlot]);

  const selectedDaySlots = useMemo(() => {
    return (timeSlot ?? []).filter((slot) => {
      const key = getSlotDateKey(slot);
      return key ? key === selectedDateKey : true;
    });
  }, [selectedDateKey, timeSlot]);
  const onSubmit = (values: ReservationFormValues) => {
    const dateKey = selectedDate.calendar("gregory").format("YYYY-MM-DD");
    const startDateTime = `${dateKey}T${values.startTime}:00`;
    const endDateTime = `${dateKey}T${values.endTime}:00`;

    if (!dayjs(endDateTime).isAfter(dayjs(startDateTime))) {
      setError("endTime", { type: "manual", message: "ساعت پایان باید بعد از ساعت شروع باشد." });
      return;
    }

    mutate(
      {
        method: "post",
        url: "TimeSlot",
        data: {
          startTime: startDateTime,
          endTime: endDateTime,
          price: Number(values.price),
          serviceId: values.serviceId!,
          userId: values.barberId!,
        },
      },
      {
        onSuccess: () => {
          notify.success("ساخت زمان رزرو با موفقیت انجام شد");
        },
      }
    );
  };

  if (viewMode === "month") {
    return (
      <MonthPicker
        currentDate={currentDate}
        onSelect={(month) => {
          const next = currentDate.month(month);
          setCurrentDate(next);
          setSelectedDate(next.date(1));
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
          const next = currentDate.year(year);
          setCurrentDate(next);
          setSelectedDate(next.date(1));
          setViewMode("day");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            background: (theme) =>
              `linear-gradient(165deg, ${alpha(theme.palette.primary.light, 0.08)} 0%, ${theme.palette.background.paper} 55%)`,
          }}
        >
          <Typography fontWeight={700} variant="h6">
            تعریف زمان رزرو
          </Typography>
          <Typography color="text.secondary" variant="body2" mt={0.5} mb={2}>
            برای ایجاد زمان جدید، سرویس، آرایشگر و بازه زمانی را مشخص کنید.
          </Typography>

          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <StatusHandler status={servicesStatus} refetch={servicesRefetch} skeletonHeight={20} showLinearProgress>
                <Controller
                  name="serviceId"
                  control={control}
                  rules={{ required: "لطفا سرویس را انتخاب کنید." }}
                  render={({ field }) => (
                    <Autocomplete
                      options={services?.data?.items ?? []}
                      getOptionKey={(option: ServiceWithId) => option.id}
                      getOptionLabel={(option: ServiceWithId) => option.title}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="سرویس"
                          placeholder="انتخاب سرویس"
                          error={Boolean(errors.serviceId)}
                          helperText={errors.serviceId?.message}
                        />
                      )}
                      fullWidth
                      value={services?.data?.items.find((service) => service.id === field.value) ?? null}
                      onChange={(_, value) => {
                        field.onChange(value?.id ?? null);
                        setValue("barberId", null);
                        clearErrors(["barberId", "serviceId"]);
                      }}
                    />
                  )}
                />
              </StatusHandler>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <StatusHandler
                status={!Boolean(selectedService) ? "success" : barbersStatus}
                refetch={barbersRefetch}
                skeletonHeight={20}
                showLinearProgress
              >
                <Controller
                  name="barberId"
                  control={control}
                  rules={{ required: "لطفا آرایشگر را انتخاب کنید." }}
                  render={({ field }) => (
                    <Autocomplete
                      options={barbers ?? []}
                      getOptionKey={(option: BarberWithUserId) => option.nationalCode}
                      getOptionLabel={(option: BarberWithUserId) => `${option.firstName} ${option.lastName}`}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="آرایشگر"
                          placeholder="انتخاب آرایشگر"
                          error={Boolean(errors.barberId)}
                          helperText={errors.barberId?.message}
                        />
                      )}
                      fullWidth
                      disabled={!Boolean(selectedService)}
                      value={barbers?.find((barber) => barber.id === field.value) ?? null}
                      onChange={(_, value) => {
                        console.log({ value });
                        field.onChange(value?.id ?? null);
                        clearErrors("barberId");
                      }}
                    />
                  )}
                />
              </StatusHandler>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box display="flex" justifyContent="center" gap={1} mb={2}>
                <IconButton onClick={goToPrevMonth} size="small" aria-label="ماه قبل">
                  <ChevronRightRoundedIcon className="nav-icon-prev" fontSize="small" />
                </IconButton>
                <Chip
                  color="primary"
                  variant="outlined"
                  label={JALALI_MONTHS[currentDate.month()]}
                  onClick={() => setViewMode("month")}
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  color="info"
                  variant="outlined"
                  label={toPersianDigits(currentDate.year())}
                  onClick={() => setViewMode("year")}
                  sx={{ fontWeight: 600 }}
                />
                <IconButton onClick={goToNextMonth} size="small" aria-label="ماه بعد">
                  <ChevronLeftRoundedIcon className="nav-icon-next" fontSize="small" />
                </IconButton>
              </Box>

              <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
                {JALALI_WEEK_DAYS.map((day, i) => (
                  <Typography
                    key={day}
                    textAlign="center"
                    fontWeight={700}
                    color={i === 6 ? "error.main" : "text.secondary"}
                  >
                    {day}
                  </Typography>
                ))}

                {Array.from({ length: offset }).map((_, i) => (
                  <Box key={`empty-${i}`} />
                ))}

                {days.map((day) => {
                  const isSelected = day.isSame(selectedDate, "day");
                  const dateKey = day.calendar("gregory").format("YYYY-MM-DD");
                  const slotCount = slotsByDate.get(dateKey) ?? 0;

                  return (
                    <Box
                      key={day.format("YYYY-MM-DD")}
                      onClick={() => setSelectedDate(day)}
                      sx={{
                        textAlign: "center",
                        px: 1,
                        py: 1.2,
                        borderRadius: 2,
                        border: (theme) =>
                          isSelected ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                        cursor: "pointer",
                        transition: "all .2s ease",
                        background: (theme) => {
                          if (isSelected) return alpha(theme.palette.primary.main, 0.14);
                          if (isHoliday(day)) return alpha(theme.palette.error.light, 0.22);
                          return theme.palette.background.paper;
                        },
                        "&:hover": { transform: "translateY(-1px)", boxShadow: 2 },
                      }}
                    >
                      <Typography fontWeight={700} color={isHoliday(day) ? "error.main" : "text.primary"}>
                        {toPersianDigits(day.format("D"))}
                      </Typography>
                      {slotCount > 0 && (
                        <Typography variant="caption" color="primary.main" fontWeight={600}>
                          {toPersianDigits(slotCount)} بازه
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                height: "100%",
              }}
            >
              <Typography fontWeight={700} variant="subtitle1">
                ایجاد زمان جدید
              </Typography>
              <Typography variant="caption" color="text.secondary" mb={1.5} display="block">
                {getPersianDateLabel(selectedDate)}
              </Typography>

              <StatusHandler
                status={!Boolean(selectedService) ? "success" : timeSlotStatus}
                refetch={timeSlotRefetch}
                skeletonHeight={120}
                showLinearProgress
              >
                {selectedDaySlots.length === 0 ? (
                  <Typography color="text.secondary" mb={1}>
                    برای این روز بازه زمانی ثبت نشده است.
                  </Typography>
                ) : (
                  <Stack gap={1} mb={1.5}>
                    {selectedDaySlots.map((slot, index) => (
                      <Box
                        key={`${slot.id ?? index}-${slot.startTime}-${slot.endTime}`}
                        sx={{
                          border: (theme) => `1px solid ${theme.palette.divider}`,
                          borderRadius: 2,
                          p: 1.2,
                          backgroundColor: "background.default",
                        }}
                      >
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography fontWeight={600}>
                            {`${getTimeLabel(slot.startTime)} - ${getTimeLabel(slot.endTime)}`}
                          </Typography>
                          <Chip size="small" color="success" variant="outlined" label={toPersianDigits(slot.price)} />
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                )}
              </StatusHandler>

              <Box
                sx={{
                  mt: 1,
                  p: 1.5,
                  borderRadius: 2,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  backgroundColor: (theme) => alpha(theme.palette.info.light, 0.08),
                }}
              >
                <Typography fontWeight={700} mb={1}>
                  افزودن بازه زمانی
                </Typography>

                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="startTime"
                      control={control}
                      rules={{ required: "ساعت شروع الزامی است." }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="time"
                          label="ساعت شروع"
                          error={Boolean(errors.startTime)}
                          helperText={errors.startTime?.message}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="endTime"
                      control={control}
                      rules={{ required: "ساعت پایان الزامی است." }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="time"
                          label="ساعت پایان"
                          error={Boolean(errors.endTime)}
                          helperText={errors.endTime?.message}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name="price"
                      control={control}
                      rules={{
                        required: "قیمت الزامی است.",
                        min: { value: 1, message: "قیمت باید بزرگتر از صفر باشد." },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label="قیمت"
                          error={Boolean(errors.price)}
                          helperText={errors.price?.message}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      loading={isPending}
                      type="submit"
                      disabled={!selectedService || !selectedBarber}
                      sx={{ py: 1.2, borderRadius: 2 }}
                    >
                      ایجاد زمان رزرو
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {createTimeSpanError && (
                <Alert severity="error" sx={{ mt: 1.5 }}>
                  {createTimeSpanError.message}
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};

export default ReservationCalendar;
