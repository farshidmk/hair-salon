import { ServerResponse } from "@/types/server";
import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import React from "react";
import { Service } from "../service.types";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { IRenderInput } from "@/types/renderItem";
import RenderFormItems from "@/components/renderFormItems/RenderFormItems";
import { Button, Container } from "@mui/material";
import { PhotoDropzone } from "@/components/photoDropzone/PhotoDropzone";
import { toFormData } from "@/services/objectToFormData";

const ServiceForm = () => {
  const { mutate, status, isPending } = useMutation<ServerResponse<boolean>, Error, AxiosRequestConfig<FormData>>({});

  const formMethods = useForm<Service>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  function onSubmit(data: Service) {
    console.log(data);

    mutate({
      method: "post",
      url: "Service",
      data: toFormData(data),
    });
  }

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          {ITEMS.map((item) => (
            <RenderFormItems key={item.name} item={item as IRenderInput} />
          ))}

          <Controller
            name="photo"
            control={control}
            render={({ field }) => <PhotoDropzone onChange={field.onChange} error={errors.photo?.message} />}
          />

          <Button type="submit" loading={isPending}>
            ثبت
          </Button>
        </FormProvider>
      </form>
    </Container>
  );
};

export default ServiceForm;

const ITEMS: IRenderInput<Service>[] = [
  {
    name: "name",
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
