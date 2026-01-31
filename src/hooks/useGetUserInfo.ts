import { getTokenInfo } from "@/services/cookies";
import { LoggedInUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetUserInfo = () => {
  return useQuery<LoggedInUser | null, Error, LoggedInUser | null>({
    queryKey: ["check token"],
    queryFn: getTokenInfo,
  });
};

export default useGetUserInfo;
