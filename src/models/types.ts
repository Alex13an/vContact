export type FilterTypes = "name" | "phone" | "email" | "tags";

export interface Filter {
  type: FilterTypes;
  value: string;
}

export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  tags: string[];
}
