import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export type CustomGridValidRowModel<T> = T & {
  /**
   * show grid index - should add in the row definition
   */
  dataGridIndex?: number; // New property added
};
export type CustomGridColDef<T extends GridValidRowModel = GridValidRowModel> = GridColDef<
  CustomGridValidRowModel<T>,
  any
> & {
  field: keyof T | "action" | "custom" | "index";
};

export type CustomGridPagination = {
  count: number;
  pageNumber: number;
};
