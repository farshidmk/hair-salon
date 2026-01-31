import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, DataGridProps } from "@mui/x-data-grid";
import { Pagination, Select, MenuItem, Box } from "@mui/material";
import persianLocaleText from "./CustomGridLocale";
import { CustomGridPagination } from "./customGrid.types";
import "./customGrid.css";

type Props = {
  totalItems?: number;
  paginationState?: {
    pageNumber: number;
    pageSize: number;
    setPagination: (page: number, size: number) => void;
  };
  disablePagination?: boolean;
} & DataGridProps;

const CustomGridData = (props: Props) => {
  const { paginationState, disablePagination, rowCount, totalItems, ...rest } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setContainerWidth(width);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (paginationState && !disablePagination) {
      paginationState.setPagination(newPage, paginationState.pageSize);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (paginationState && !disablePagination) {
      paginationState.setPagination(0, newPageSize); // reset to first page
    }
  };

  const paginationEnabled = Boolean(paginationState) && !disablePagination;

  const totalPages = paginationState && totalItems ? Math.ceil(totalItems / paginationState.pageSize) : 0;

  // ✅ Custom Pagination component to inject into DataGrid
  const CustomPagination = () => {
    if (!paginationState || !showPageSelector || totalPages <= 0) return null;

    // calculate range
    const start = paginationState.pageNumber * paginationState.pageSize + 1;
    const end = Math.min((paginationState.pageNumber + 1) * paginationState.pageSize, totalItems ?? 0);

    return (
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Page size selector */}
        <Select
          size="small"
          value={paginationState.pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          variant="outlined"
        >
          {[10, 20, 50, 100].map((size) => (
            <MenuItem key={size} value={size}>
              {size} / صفحه
            </MenuItem>
          ))}
        </Select>

        {/* Range indicator */}
        <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
          {start}-{end} از {totalItems ?? 0}
        </Box>

        {/* Page number buttons */}
        <Pagination
          count={totalPages}
          page={paginationState.pageNumber + 1} // DataGrid is 0-based, Pagination is 1-based
          onChange={(_, value) => handlePageChange(value - 1)}
          variant="outlined"
          shape="circular"
          color="primary"
        />
      </Box>
    );
  };

  return (
    <div ref={containerRef} className="h-full w-full overflow-auto" style={{ minHeight: "200px" }} dir="rtl">
      <DataGrid
        key={containerWidth}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        pageSizeOptions={disablePagination ? [] : [10, 20, 50, 100]}
        // rowsPerPageOptions={disablePagination ? [] : [10, 20, 50, 100]}
        rowCount={rowCount}
        // sx={{
        //   "& .MuiDataGrid-columnHeaderTitle": {
        //     fontWeight: "600",
        //     fontSize: "14px",
        //     textAlign: "center",
        //   },
        //   "& .MuiDataGrid-cell": {
        //     display: "flex",
        //     alignItems: "center",
        //   },
        //   "& .MuiDataGrid-main": {
        //     height: "100%",
        //     minHeight: "200px",
        //   },
        //   height: "100%",
        //   width: "100%",
        //   direction: "rtl",
        // }}
        localeText={persianLocaleText}
        pagination={paginationEnabled ? true : undefined}
        paginationMode={paginationEnabled ? "server" : "client"}
        paginationModel={
          paginationState
            ? {
                page: paginationState!.pageNumber,
                pageSize: paginationState!.pageSize,
              }
            : undefined
        }
        onPaginationModelChange={({ page, pageSize }) => paginationState?.setPagination(page, pageSize)}
        // page={paginationEnabled ? paginationState!.pageNumber : undefined}
        // pag
        // pageSize={paginationEnabled ? paginationState!.pageSize : undefined}
        // onPageChange={paginationEnabled ? handlePageChange : undefined}
        // onPageSizeChange={paginationEnabled ? handlePageSizeChange : undefined}
        // ✅ override footer pagination
        // components={{
        //   Pagination: showPageSelector ? CustomPagination : GridPagination,
        // }}

        {...rest}
      />
    </div>
  );
};

export default CustomGridData;

export type CustomGridColumn<T> = GridColDef & {
  field: keyof T | "action" | "index";
};

export const DEFAULT_PAGINATION: CustomGridPagination = {
  count: 10,
  pageNumber: 0,
};
