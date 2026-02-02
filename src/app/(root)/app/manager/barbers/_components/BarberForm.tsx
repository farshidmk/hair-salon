"use client";

import { Autocomplete, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarberFormValues, barberSchema } from "../barber.validation";
import { PhotoDropzone } from "@/components/photoDropzone/PhotoDropzone";
import { useMutation } from "@tanstack/react-query";
import { ServerResponse } from "@/types/server";
import { DEFAULT_COMPANY_ID } from "@/shared/consts";
import RenderFormItems from "@/components/renderFormItems/RenderFormItems";
import { IRenderInput } from "@/types/renderItem";
import { Barber } from "../barber.types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useGetAllServices from "../_hooks/useGetAllServices";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { ServiceWithId } from "../../services/service.types";

function BarberForm() {
  const { data: listOfServices, status: listOfServicesStatus, refetch: listOfServicesRefetch } = useGetAllServices();
  const { isPending } = useMutation<ServerResponse<number>, Error, BarberFormValues>({});

  const formMethods = useForm<BarberFormValues>({
    resolver: zodResolver(barberSchema),
    defaultValues: {
      CompanyId: DEFAULT_COMPANY_ID,
      Services: [],
    },
  });
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formMethods;

  const onSubmit = (data: BarberFormValues) => {
    // createBarber.mutate(data);
    console.log({ data });
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mb={1} fontWeight={600}>
        ثبت نام آرایشگر
      </Typography>

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
                name="Photo"
                control={control}
                render={({ field }) => (
                  <PhotoDropzone
                    onChange={field.onChange}
                    error={errors.Photo?.message}
                    value={watch("Photo") as unknown as File}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <StatusHandler
                status={listOfServicesStatus}
                refetch={listOfServicesRefetch}
                skeletonHeight={20}
                showLinearProgress
              >
                <Autocomplete
                  multiple
                  options={listOfServices?.data?.items ?? []}
                  getOptionKey={(option: ServiceWithId) => option.Id}
                  getOptionLabel={(option: ServiceWithId) => option.name}
                  renderInput={(params) => <TextField {...params} label="سرویس" placeholder="انتخاب سرویس ها" />}
                  fullWidth
                  value={listOfServices?.data?.items.filter((service) => watch("Services").includes(service.Id))}
                  onChange={(e, v) => {
                    setValue(
                      "Services",
                      v.map((service) => service.Id)
                    );
                  }}
                />
              </StatusHandler>
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
}

export default BarberForm;

const ITEMS: IRenderInput<Barber>[] = [
  {
    name: "firstName",
    inputType: "text",
    label: "نام",
  },
  {
    name: "lastName",
    inputType: "text",
    label: "قیمت",
  },
  {
    name: "mobile",
    inputType: "text",
    label: "تلفن همراه",
  },
];

// PhoneNumber: z
//     .string()
//     .regex(/^09[0-9]{9}$/, { message: "شماره تلفن معتبر نیست. شماره باید با 09 شروع شود و 11 رقم باشد." })
//     .min(11, { message: "شماره تلفن باید 11 رقم باشد." }) // Optional extra validation
//     .max(11, { message: "شماره تلفن باید 11 رقم باشد." }), // Optional extra validation
