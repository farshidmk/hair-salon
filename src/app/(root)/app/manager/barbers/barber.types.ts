import { ServiceWithId } from "../services/service.types";

export type Barber = {
  id?: number;
  firstName: string;
  lastName: string;
  mobile: string;
  companyId: number;
  services: number[];
};

export type BarberListResponse = {
  firstName: string;
  lastName: string;
  nationalCode: number;
  photo: string;
  phoneNumber: string;
  userCompanyServices: ServiceWithId[];
};
