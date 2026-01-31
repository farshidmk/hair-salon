import { useMemo } from "react";
import { CustomGridPagination } from "./customGrid.types";

/**
 * A generic hook for paginating data and generating a global index for MUI DataGrid rows.
 *
 * @template T Row type of your data source.
 *
 * @param {T[] | undefined} rows - The raw data array coming from API or state.
 * @param {CustomGridPagination} pagination - Contains page number (0-based) and page size.
 *
 * @returns {{
 *   paginatedRows: (T & { dataGridIndex: number })[];
 *   totalRows: number;
 *   startIndex: number;
 * }}
 * - `paginatedRows`: Data with global index added.
 * - `totalRows`: Total number of items before pagination.
 * - `startIndex`: The starting index of the current page.
 */
export function useGridPagination<T>(rows: T[] | undefined, pagination: CustomGridPagination) {
  const totalRows = rows?.length ?? 0;

  const startIndex = pagination.pageNumber * pagination.count;

  const paginatedRows = useMemo(() => {
    if (!rows) return [];

    return rows.map((row, index) => ({
      ...row,
      dataGridIndex: startIndex + index + 1,
    }));
  }, [rows, startIndex]);

  return { paginatedRows, totalRows, startIndex };
}
