import { dbClient } from "../utils/dbClient";
import { TransferTypes } from "./transferTypes";

// THESE SHOULD NOT BE HERE THEY SHOULD IVE IN SHARED FOLDER
const dataTypes = ["sender", "recipient", "list", "blast", "message"] as const;
type DataType = (typeof dataTypes)[number];

/**
 * AUTH VERSION
 * Retrieves all records from the specified table with an optional limit.
 */
export const getAllV2 = (
  table: DataType,
  filterResults: boolean = true,
  limit: number = 10
) =>
  requireAuth(async (req, res) => {
    console.log("GET /all route called:", table);

    const senderId = await accessSenderId(req.auth.userId);

    const whereClause = {
      deletedAt: null,
      ...(filterResults && { senderId }),
    };

    const answerList = await (dbClient[table] as any).findMany({
      where: whereClause,
      take: limit,
    });
    res.json({ items: answerList });
  });

/**
 * Retrieves all records from the specified table with an optional limit.
 */
export const getAll =
  <Table extends keyof TransferTypes>(table: Table, limit: number = 10) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("GET /all route called:", table);
    const answerList = await (dbClient[table] as any).findMany({
      where: {
        deletedAt: null,
      },
      take: limit,
    });
    res.json({ items: answerList });
  };

import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY

import {
  requireAuth,
  LooseAuthProp,
  WithAuthProp,
} from "@clerk/clerk-sdk-node";

import { Application, Request, Response } from "express";
import { accessSenderId } from "./accessSenderId";
import { Blast, List, Message, Recipient, Sender } from "@prisma/client";

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

// /**
//  * AUTH VERSION: Returned function will searches a named table and return { items : something[] }
//  * Only searches the "name" column of the table for now.
//  */
// export const getSearchWithAuth = <Table extends keyof TransferTypes>(
//   table: Table,
//   limit: number = 10
// ) =>
//   requireAuth(
//     async (
//       req: TransferTypes[Table]["req"],
//       res: TransferTypes[Table]["res"]
//     ) => {
//       console.log("GET /search WITH AUTH route called:", table);
//       const clerkId = req.auth.userId; // Accessing Clerk ID
//       const supplierId = await accessSenderId(clerkId);
//       const { query } = req.params;
//       console.log(`Searching the name field for query: ${query}`);
//       const answerList = await (dbClient[table] as any).findMany({
//         where: {
//           name: {
//             contains: query,
//             mode: "insensitive",
//           },
//           deletedAt: null,
//           supplierId: supplierId,
//         },
//         take: limit,
//       });
//       res.json({ items: answerList });
//     }
//   );

/**
 * AUTH VERSION WHICH ALSO FILTERS BY SENDER
 * Returned function searches a named table and return { items : something[] }
 * Only searches the "name" column of the table for now.
 */
export const getSearchWithSenderFilter = <Table extends keyof TransferTypes>(
  table: Table,
  limit: number = 10
) =>
  requireAuth(
    async (
      req: TransferTypes[Table]["req"],
      res: TransferTypes[Table]["res"]
    ) => {
      console.log("GET /search WITH AUTH route called:", table);
      const clerkId = req.auth.userId; // Accessing Clerk ID
      const senderId = await accessSenderId(clerkId);

      console.log("Request headers authorization:", req.headers.authorization);
      const { query } = req.params;
      console.log(`Searching the name field for query: ${query}`);
      const answerList = await (dbClient[table] as any).findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
          deletedAt: null,
          senderId: senderId, // Add this line to filter by supplierId
        },
        take: limit,
      });
      res.json({ items: answerList });
    }
  );

/**
 * Returned function will searches a named table and return { items : something[] }
 * Only searches the "name" column of the table for now.
 */
export const getSearch =
  <Table extends keyof TransferTypes>(table: Table, limit: number = 10) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("GET /search route called:", table);
    console.log("Request headers authorization:", req.headers.authorization);
    const { query } = req.params;
    console.log(`Searching the name field for query: ${query}`);
    const answerList = await (dbClient[table] as any).findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        deletedAt: null,
      },
      take: limit,
    });
    res.json({ items: answerList });
  };

/**
 * Retrieves a single record from the specified table by its ID.
 */
export const getOne =
  <Table extends keyof TransferTypes>(table: Table) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("GET /:id route called with:", table);
    const { id } = req.params;
    console.log("id:", id);

    const answer = await (dbClient[table] as any).findUnique({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });
    res.json({ items: answer ? [answer] : [] });
  };

/**
 * Deletes a single record from the specified table by its ID.
 */
export const deleteOne =
  <Table extends keyof TransferTypes>(table: Table) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("DELETE /:id route called with:", table);
    const { id } = req.params;
    console.log("id:", id);

    try {
      const deletedRecord = await (dbClient[table] as any).update({
        where: {
          id: Number(id),
        },
        data: {
          deletedAt: new Date(),
        },
      });
      res.json({ items: [deletedRecord] });
    } catch (error) {
      console.error("Error deleting record:", error);
      res.status(500).send();
    }
  };
