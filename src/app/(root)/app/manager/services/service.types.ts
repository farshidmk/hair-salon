export type Service = {
  name: string;
  companyId: number;
  photo: string;
  price: number;
  beyanePrice: number;
};

export type ServiceWithId = { Id: number } & Service;
