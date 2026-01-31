import { PaginatedServerResponse, ServerResponse } from "@/types/server";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Service, ServiceWithId } from "../service.types";
import CustomGridData from "@/components/customGridData/CustomeGridData";
import { CustomGridColDef } from "@/components/customGridData/customGrid.types";
import { showMoney } from "@/services/utils";
import { Container, IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

type Props = {};

const ListOfServices = (props: Props) => {
  const { data, status } = useQuery<
    PaginatedServerResponse<ServiceWithId[]>,
    Error,
    PaginatedServerResponse<ServiceWithId[]>
  >({
    queryKey: ["Service", "?pageNo=1&pageSize=15"],
  });

  const columns = useMemo((): CustomGridColDef<Service>[] => {
    return [
      //   {
      //     field: "photo",
      //     sortable: false,
      //     headerName: "عکس",
      //     align: "center",
      //     headerAlign: "center",
      //     renderCell: (param) => (
      //       <Tooltip title={param.row.seenState ? "دیده شده" : "دیده نشده"}>
      //         {param.row.seenState ? <DraftsIcon color="disabled" /> : <LocalPostOfficeIcon color="primary" />}
      //       </Tooltip>
      //     ),
      //     width: 65,
      //   },
      { field: "name", sortable: false, headerName: "نام", flex: 2, align: "center", headerAlign: "center" },
      {
        field: "price",
        sortable: false,
        headerName: "قیمت",
        flex: 1,
        align: "center",
        headerAlign: "center",
        cellClassName: "acsGrid-wrapText",
        renderCell: (param) => (
          <div className="customCellWrapText">
            <p className="text-xs">{showMoney(param.row.price)}</p>
          </div>
        ),
      },
      {
        field: "beyanePrice",
        sortable: false,
        headerName: "قیمت بیانه",
        flex: 1,
        align: "center",
        headerAlign: "center",
        cellClassName: "acsGrid-wrapText",
        renderCell: (param) => (
          <div className="customCellWrapText">
            <p className="text-xs">{showMoney(param.row.beyanePrice)}</p>
          </div>
        ),
      },

      {
        field: "action",
        sortable: false,
        headerName: "عملیات",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (param) => {
          return (
            <div className="w-full flex items-center justify-center gap-0.5">
              <Tooltip title="حذف">
                <IconButton color="error">
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="ویرایش">
                <IconButton color="info">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <Container maxWidth="xl" sx={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
      <CustomGridData
        columns={columns}
        rows={data?.Data.Items}
        loading={status === "pending"}
        getRowId={(row: ServiceWithId) => row.Id}
      />
      ;
    </Container>
  );
};

{
  /* <AcsGridData
          rows={currentRows}
          columns={columns}
          getRowId={(row: DynamicDocumentSearchResponseDoc[number]) => row.DocId}
          paginationState={{
            pageNumber: pagination.pageNumber,
            pageSize: pagination.count,
            setPagination(pageNumber, count) {
              // onSearch({ pageNumber, count });
              setPagination({ pageNumber: pageNumber, count });
            },
          }}
          totalItems={data?.data?.count}
          rowCount={data?.data?.count}
          loading={isPending}
          rowHeight={80}
        /> */
}

export default ListOfServices;
