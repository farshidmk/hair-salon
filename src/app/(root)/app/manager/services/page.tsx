"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ServiceForm from "./_components/ServiceForm";

const ServicesPage = () => {
  const { data, status } = useQuery({
    queryKey: ["Service", "?pageNo=1&pageSize=15"],
  });
  return (
    <div>
      <ServiceForm />
    </div>
  );
};

export default ServicesPage;
