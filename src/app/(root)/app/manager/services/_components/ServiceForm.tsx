import { PhotoDropzone } from "@/components/photoDropzone/PhotoDropzone";
import RenderFormItems from "@/components/renderFormItems/RenderFormItems";
import { toFormData } from "@/services/objectToFormData";
import { DEFAULT_COMPANY_ID } from "@/shared/consts";
import { IRenderInput } from "@/types/renderItem";
import { ServerResponse } from "@/types/server";
import { Button, Container, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Service } from "../service.types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ServiceForm = () => {
  const { mutate, isPending } = useMutation<ServerResponse<boolean>, Error, AxiosRequestConfig<FormData>>({});

  const formMethods = useForm<Service>({
    defaultValues: {
      beyanePrice: 0,
      companyId: DEFAULT_COMPANY_ID,
      name: "",
      price: 0,
    },
  });
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  function onSubmit(data: Service) {
    mutate({
      method: "post",
      url: "Service",
      data: toFormData(data),
    });
  }

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
        <FormProvider {...formMethods}>
          <Grid container spacing={1}>
            {ITEMS.map((item) => (
              <Grid size={{ xs: 12, md: 4 }} key={item.name}>
                <RenderFormItems item={item as IRenderInput} />
              </Grid>
            ))}

            <Grid size={{ xs: 12 }}>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <PhotoDropzone
                    onChange={field.onChange}
                    error={errors.photo?.message}
                    value={watch("photo") as unknown as File}
                  />
                )}
              />
            </Grid>
          </Grid>
          <div className="w-full flex items-center justify-center mt-2">
            <Button
              type="submit"
              loading={isPending}
              sx={{ maxWidth: "400px" }}
              fullWidth
              color="success"
              variant="contained"
              endIcon={<CheckCircleOutlineIcon />}
            >
              ثبت
            </Button>
          </div>
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
    inputType: "money",
    label: "قیمت",
    elementProps: {
      type: "number",
    },
  },
  {
    name: "beyanePrice",
    inputType: "money",
    label: "بیانه",
    elementProps: {
      type: "number",
    },
  },
];
