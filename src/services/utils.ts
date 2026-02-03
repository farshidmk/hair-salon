export function showMoney(money: number | string, showToman: boolean = true) {
  try {
    return `${Number(money).toLocaleString("fa")}${showToman ? " تومان" : ""}`;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Converts a value to Persian digits without thousands separators.
 * If the input is not a finite number, it will be coerced to a number.
 * If coercion fails, returns an empty string.
 *
 * Examples:
 *   toPersianDigits(1404)        -> "۱۴۰۴"
 *   toPersianDigits("1404")      -> "۱۴۰۴"
 *   toPersianDigits("abc")       -> ""
 *   toPersianDigits(1404.5)      -> "۱۴۰۴٫۵" (Persian decimal separator)
 *
 * @param value The value to format. Can be a number, numeric string, or other coercible to number.
 * @returns The Persian-formatted string without grouping, or "" if invalid.
 */
export function toPersianDigits(value: unknown): string {
  let num: number;

  if (typeof value === "number") {
    num = value;
  } else {
    num = Number(value);
  }

  if (!Number.isFinite(num)) {
    return "";
  }

  // Use fa-IR locale with grouping disabled (no thousands separator)
  return num.toLocaleString("fa-IR", { useGrouping: false });
}
