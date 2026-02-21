import { BarberListResponse } from "../barbers/barber.types";

export type TimeSpanItem = {
  id?: number;
  startTime: string;
  endTime: string;
  price: number;
  serviceId: number;
  userId: string;
  date?: string;
  day?: string;
  reservedDate?: string;
  slotDate?: string;
};

export type CreateTimeSpanPayload = {
  startTime: string;
  endTime: string;
  price: number;
  serviceId: number;
  userId: string;
};

export type BarberWithUserId = BarberListResponse & {
  id?: string;
};
