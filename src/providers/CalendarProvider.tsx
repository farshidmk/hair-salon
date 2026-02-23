"use client";

import dayjs from "@/services/dayjs";
import { CalendarViewMode, getMonthDays, getStartOffset } from "@/components/customCalendar/CustomCalendar";
import { Dayjs } from "dayjs";
import React, { createContext, useContext, useMemo, useState } from "react";

type CalendarProviderProps = {
  children: React.ReactNode;
  initialDate?: Dayjs;
};

type CalendarContextValue = {
  viewMode: CalendarViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<CalendarViewMode>>;
  currentDate: Dayjs;
  setCurrentDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  selectedDate: Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  yearRangeStart: number;
  setYearRangeStart: React.Dispatch<React.SetStateAction<number>>;
  days: Dayjs[];
  offset: number;
  selectedDateKey: string;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  selectMonth: (month: number) => void;
  selectYear: (year: number) => void;
  openMonthPicker: () => void;
  openYearPicker: () => void;
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

const CalendarProvider = ({ children, initialDate }: CalendarProviderProps) => {
  const baseDate = initialDate ?? dayjs().calendar("jalali").startOf("day");
  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  const [yearRangeStart, setYearRangeStart] = useState(1370);
  const [currentDate, setCurrentDate] = useState(baseDate);
  const [selectedDate, setSelectedDate] = useState(baseDate);

  const days = useMemo(() => getMonthDays(currentDate), [currentDate]);
  const offset = useMemo(() => getStartOffset(currentDate), [currentDate]);
  const selectedDateKey = useMemo(() => selectedDate.calendar("gregory").format("YYYY-MM-DD"), [selectedDate]);

  const selectMonth = (month: number) => {
    const next = currentDate.month(month);
    setCurrentDate(next);
    setSelectedDate(next.date(1));
    setViewMode("day");
  };

  const selectYear = (year: number) => {
    const next = currentDate.year(year);
    setCurrentDate(next);
    setSelectedDate(next.date(1));
    setViewMode("day");
  };

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

  const value: CalendarContextValue = {
    viewMode,
    setViewMode,
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    yearRangeStart,
    setYearRangeStart,
    days,
    offset,
    selectedDateKey,
    goToPrevMonth,
    goToNextMonth,
    selectMonth,
    selectYear,
    openMonthPicker: () => setViewMode("month"),
    openYearPicker: () => setViewMode("year"),
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used inside CalendarProvider");
  }

  return context;
};

export default CalendarProvider;
