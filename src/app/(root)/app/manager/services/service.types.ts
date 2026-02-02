export type Service = {
  title: string;
  companyId: number;
  photo: string;
  price: number;
  beyanePrice: number;
};

export type ServiceWithId = { id: number } & Service;
