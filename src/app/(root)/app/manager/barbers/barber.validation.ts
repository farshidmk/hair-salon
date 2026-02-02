import { z } from "zod";

export const barberSchema = z.object({
  firstName: z.string().min(2, "نام را وارد کنید"),
  lastName: z.string().min(2, "نام خانوادگی را وارد کنید"),
  mobile: z.string().min(10, "شماره همراه را به درستی وارد کنید"),
  companyId: z.number().min(0, "کمپانی مورد نظر را انتخاب کنید"),
  photo: z.instanceof(File, { message: "عکس را وارد کنید" }),
  services: z.array(z.number()),
  // .min(1, "At least one service must be selected"),
});

export type BarberFormValues = z.infer<typeof barberSchema>;
