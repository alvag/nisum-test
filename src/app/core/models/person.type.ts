export type Person = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type ResponsePerson = {
  page: number;
  per_page: number;
  total_pages: number;
  total: number;
  data: CustomPerson[];
}

export type CustomPerson = Person & {
  startDate?: string;
  endDate?: string;
  createdAt?: string;
}
