// import mockServiceFactory from "@/services/mockService";
import prodServiceFactory from "../frontend/src/services/prodService";
import { API_PATHS } from "../frontend/src/services/util/config";

/**
 * SHARED CONFIG SETTINGS
 */

// export const apiServiceFactory: ApiServiceFactory = mockService
// Options here: mockServiceFactory | prodServiceFactory
export const apiServiceFactory: ApiServiceFactory = prodServiceFactory;

/**
 * SHARED TYPES
 */

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
  deleteItem: (id: number) => Promise<any>;
  newItem: (data: any) => Promise<any>;
  updateItem: (id: number, data: any) => Promise<any>;
};

export type DBTable = keyof typeof API_PATHS;

export type ApiServiceFactory = (table: DataType) => ApiService;
