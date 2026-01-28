"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

const AppPage = (props: Props) => {
  const { data } = useQuery({
    queryKey: ["Company", "?pageNo=1&pageSize=10"],
  });
  return <div>page 2</div>;
};

export default AppPage;
