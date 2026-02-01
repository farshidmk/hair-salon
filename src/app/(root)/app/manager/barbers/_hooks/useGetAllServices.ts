import { PaginatedServerResponse } from "@/types/server";
import { useQuery } from "@tanstack/react-query";
import { ServiceWithId } from "../../services/service.types";
import { ULTIMATE_PAGINATION_QUERY } from "@/shared/consts";

const useGetAllServices = () => {
  return useQuery<PaginatedServerResponse<ServiceWithId>, Error, PaginatedServerResponse<ServiceWithId>>({
    queryKey: ["Service", ULTIMATE_PAGINATION_QUERY],
  });
};

export default useGetAllServices;
