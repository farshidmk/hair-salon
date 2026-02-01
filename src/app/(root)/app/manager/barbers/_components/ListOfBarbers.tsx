import CustomGridData from "@/components/customGridData/CustomeGridData";
import { CustomGridColDef } from "@/components/customGridData/customGrid.types";
import { DEFAULT_COMPANY_ID } from "@/shared/consts";
import { ServerResponse } from "@/types/server";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Container, IconButton, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Barber } from "../barber.types";

const ListOfBarbers = () => {
  const { data, status } = useQuery<ServerResponse<Barber[]>, Error, ServerResponse<Barber[]>>({
    queryKey: [`UserCompany/GetBarberCompany?companyId=${DEFAULT_COMPANY_ID}`],
  });

  const columns = useMemo((): CustomGridColDef<Barber>[] => {
    return [
      { field: "FirstName", sortable: false, headerName: "نام", flex: 2, align: "center", headerAlign: "center" },
      {
        field: "LastName",
        sortable: false,
        headerName: "نام خانوادگی",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: ({ value }) => <a href={`tel:${value}`}>{value}</a>,
      },
      {
        field: "Mobile",
        sortable: false,
        headerName: "شماره تلفن",
        width: 200,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "Services",
        sortable: false,
        headerName: "سرویس ها",
        width: 200,
        align: "center",
        headerAlign: "center",
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
        rows={data?.Data}
        loading={status === "pending"}
        getRowId={(row: Barber) => row.Id!}
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

export default ListOfBarbers;
