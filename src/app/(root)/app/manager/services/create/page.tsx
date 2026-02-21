"use client";
import { ServerResponse } from "@/types/server";
import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import React from "react";
import { Service } from "../service.types";
import { FormProvider, useForm } from "react-hook-form";
import { IRenderInput } from "@/types/renderItem";
import RenderFormItems from "@/components/renderFormItems/RenderFormItems";
import { Button, Container } from "@mui/material";

const CreateService = () => {
  const { mutate, status, isPending } = useMutation<ServerResponse<boolean>, Error, AxiosRequestConfig<Service>>({});

  const formMethods = useForm<Service>();
  const { register, handleSubmit } = formMethods;

  function onSubmit(data: Service) {
    console.log(data);

    mutate({
      method: "post",
      url: "Service",
      data: {
        ...data,
        companyId: 0,
        photo: "",
      },
    });
  }

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          {ITEMS.map((item) => (
            <RenderFormItems key={item.name} item={item as IRenderInput} />
          ))}

          <Button type="submit" loading={isPending}>
            ثبت
          </Button>
        </FormProvider>
      </form>
    </Container>
  );
};

export default CreateService;

const ITEMS: IRenderInput<Service>[] = [
  {
    name: "title",
    inputType: "text",
    label: "نام سرویس",
  },
  {
    name: "price",
    inputType: "text",
    label: "قیمت",
    elementProps: {
      type: "number",
    },
  },
  {
    name: "beyanePrice",
    inputType: "text",
    label: "بیانه",
    elementProps: {
      type: "number",
    },
  },
];
