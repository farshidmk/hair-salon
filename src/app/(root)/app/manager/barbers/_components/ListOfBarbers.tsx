import CustomGridData from "@/components/customGridData/CustomeGridData";
import { CustomGridColDef } from "@/components/customGridData/customGrid.types";
import { DEFAULT_COMPANY_ID } from "@/shared/consts";
import { ServerResponse } from "@/types/server";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Container, IconButton, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { BarberListResponse } from "../barber.types";

const ListOfBarbers = () => {
  const { data, status } = useQuery<ServerResponse<BarberListResponse[]>, Error, BarberListResponse[]>({
    queryKey: [`UserCompany/GetBarberCompany?companyId=${DEFAULT_COMPANY_ID}`],
    select: (res) => res.data,
  });

  const columns = useMemo((): CustomGridColDef<BarberListResponse>[] => {
    return [
      { field: "firstName", sortable: false, headerName: "نام", flex: 2, align: "center", headerAlign: "center" },
      {
        field: "lastName",
        sortable: false,
        headerName: "نام خانوادگی",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: ({ value }) => <a href={`tel:${value}`}>{value}</a>,
      },
      {
        field: "phoneNumber",
        sortable: false,
        headerName: "شماره تلفن",
        width: 200,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "userCompanyServices",
        sortable: false,
        headerName: "سرویس ها",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (row) => {
          const services = row.row.userCompanyServices;
          return (
            <div className="flex gap-1">
              {services.map((service) => (
                <Chip key={`${row.row.phoneNumber}-${service.id}`} label={service.title} />
              ))}
            </div>
          );
        },
      },

      {
        field: "action",
        sortable: false,
        headerName: "عملیات",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: () => {
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
        rows={data ?? []}
        loading={status === "pending"}
        getRowId={(row: BarberListResponse) => row.phoneNumber!}
      />
    </Container>
  );
};

export default ListOfBarbers;
