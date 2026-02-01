import { QueryStatus } from "@tanstack/react-query";
import React from "react";
import { LinearProgress, Skeleton } from "@mui/material";
import ErrorHandler from "../errors/ErrorHandler";

type Props = {
  children: React.ReactNode;
  status?: QueryStatus;
  refetch?: () => void;
  skeletonHeight?: number;
  errorText?: string;
  showLinearProgress?: boolean;
};

const StatusHandler = ({ status, refetch, children, skeletonHeight = 300, errorText, showLinearProgress }: Props) => {
  return (
    <>
      {status === "pending" ? (
        <>{showLinearProgress ? <LinearProgress /> : <Skeleton height={skeletonHeight} width={"100%"} />}</>
      ) : status === "error" ? (
        <ErrorHandler onRefetch={refetch!} errorText={errorText} />
      ) : (
        children
      )}
    </>
  );
};

export default StatusHandler;
