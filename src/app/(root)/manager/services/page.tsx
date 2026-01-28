"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ServicesPage = () => {
  const { data, status } = useQuery({
    queryKey: ["Service", "?pageNo=1&pageSize=15"],
  });
  return <div>BarbersPage</div>;
};

export default ServicesPage;
