import { z } from "zod";

export const barberSchema = z.object({
  FirstName: z.string().min(2, "نام را وارد کنید"),
  LastName: z.string().min(2, "نام خانوادگی را وارد کنید"),
  Mobile: z.string().min(10, "شماره همراه را به درستی وارد کنید"),
  CompanyId: z.number().min(0, "کمپانی مورد نظر را انتخاب کنید"),
  Photo: z.instanceof(File, { message: "عکس را وارد کنید" }),
  Services: z.array(z.number()),
  // .min(1, "At least one service must be selected"),
});

export type BarberFormValues = z.infer<typeof barberSchema>;
