"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarberFormValues, barberSchema } from "../barber.validation";
import { PhotoDropzone } from "@/components/photoDropzone/PhotoDropzone";
import { useMutation } from "@tanstack/react-query";
import { ServerResponse } from "@/types/server";
import { DEFAULT_COMPANY_ID } from "@/shared/consts";

function BarberForm() {
  //   const createBarber = useCreateBarber();
  const { mutate, status } = useMutation<ServerResponse<number>, Error, BarberFormValues>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BarberFormValues>({
    resolver: zodResolver(barberSchema),
    defaultValues: {
      CompanyId: DEFAULT_COMPANY_ID,
    },
  });

  const onSubmit = (data: BarberFormValues) => {
    // createBarber.mutate(data);
    console.log({ data });
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" mb={3}>
        ثبت نام آرایشگر
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="FirstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="نام"
                  fullWidth
                  error={!!errors.FirstName}
                  helperText={errors.FirstName?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="LastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="نام خانوادگی"
                  fullWidth
                  error={!!errors.LastName}
                  helperText={errors.LastName?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="Mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="تلفن همراه"
                  fullWidth
                  error={!!errors.Mobile}
                  helperText={errors.Mobile?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="Photo"
              control={control}
              render={({ field }) => <PhotoDropzone onChange={field.onChange} error={errors.Photo?.message} />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              //   disabled={createBarber.isPending}
            >
              Register Barber
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default BarberForm;
