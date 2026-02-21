import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { toPersianDigits } from "./utils";

dayjs.extend(jalaliday);

export default dayjs;

export const JALALI_WEEK_DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "امرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const getPersianDateLabel = (date: dayjs.Dayjs) => {
  const gregoryWeekDayIndex = date.calendar("gregory").day();
  const jalaliWeekDay = JALALI_WEEK_DAYS[(gregoryWeekDayIndex + 1) % 7];
  const jalaliMonth = JALALI_MONTHS[date.month()];

  return `${jalaliWeekDay} ${toPersianDigits(date.date())} ${jalaliMonth} ${toPersianDigits(date.year())}`;
};
