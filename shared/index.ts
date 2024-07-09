import { API_PATHS } from "@/services/util/config";

export const dataTypes = [
  "sender",
  "recipient",
  "list",
  "blast",
  "message",
] as const; // this tells TS to treat list as readonly tuple with specific string literal types

export type DataType = (typeof dataTypes)[number];

export type ApiService = {
  getAll: () => Promise<any>;
  getOne: (id: number) => Promise<any>;
  search: (query: string) => Promise<any>;
  delete: (id: number) => Promise<any>;
  new: (data: any) => Promise<any>;
  update: (id: number, data: any) => Promise<any>;
};

export type DBTable = keyof typeof API_PATHS;

// export type ApiServiceFactory = (table: keyof typeof API_PATHS) => ApiService;
