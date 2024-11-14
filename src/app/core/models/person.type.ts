export type Person = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export type ResponsePerson = {
  page: number;
  per_page: number;
  total_pages: number;
  total: number;
  data: CustomPerson[];
}

export type CustomPerson = Person & {
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
}
