// import mockServiceFactory from "@/services/mockService";
import prodServiceFactory from "../frontend/src/services/prodService";
import { API_PATHS } from "../frontend/src/services/util/config";
import {
  Sender,
  Recipient,
  List,
  Blast,
  Message,
} from "../server/node_modules/@prisma/client";

/**
 * SHARED CONFIG SETTINGS
 */

// export const apiServiceFactory: ApiServiceFactory = mockService
// Options here: mockServiceFactory | prodServiceFactory
export const apiServiceFactory: ApiServiceFactory = prodServiceFactory;

/**
 * SHARED TYPES
 */

export type { Sender, Recipient, List, Blast, Message };

export const dataTypes = [
  "sender",
  "recipient",
  "list",
  "blast",
  "message",
] as const; // this tells TS to treat list as readonly tuple with specific string literal types

export type DataShapes = {
  sender: Sender;
  recipient: Recipient;
  list: List;
  blast: Blast;
  message: Message;
};

export type DataType = (typeof dataTypes)[number];

export type ApiService = {
  getAll: () => Promise<any>;
  getOne: (id: number) => Promise<any>;
  search: (query: string) => Promise<any>;
  deleteItem: (id: number) => Promise<any>;
  newItem: (data: any) => Promise<any>;
  updateItem: (id: number, data: any) => Promise<any>;
};

export type DBTable = keyof typeof API_PATHS; // THIS IS PROBABLY REDUNDANT, COPY OF DataType

export type ApiServiceFactory = (
  table: DataType,
  userToken?: string
) => ApiService;

export const DefaultCreationValues = {
  sender: { name: "", clerkId: "", email: "email@example.com" },
  recipient: { name: "", senderId: 1 },
  list: { name: "", senderId: 1 },
  blast: { name: "", listId: 1 },
  message: { content: "", blastId: 1 },
};

/**
 * Fields we don't want to show to customers, especially in editing screens.
 */
export const fieldsToExclude = [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "version",
  "clerkId",
  "senderId",
];
