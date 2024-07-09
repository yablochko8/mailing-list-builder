import { dbClient } from "../utils/dbClient";
import { TransferTypes } from "./transferTypes";

export const getAll =
  <Table extends keyof TransferTypes>(table: Table, limit: number = 10) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("GET /all route called:", table);
    const answerList = await dbClient[table].findMany({
      take: limit,
    });
    res.json({ items: answerList });
  };

export const getSearch =
  <Table extends keyof TransferTypes>(table: Table, limit: number = 10) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("GET /search route called:", table);
    const { query } = req.params;
    console.log(`Searching the name field for query: ${query}`);
    const answerList = await dbClient[table].findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: limit,
    });
    res.json({ items: answerList });
  };

export const getOne =
  <Table extends keyof TransferTypes>(table: Table) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("GET /:id route called with:", table);
    const { id } = req.params;
    console.log("id:", id);

    const answer = await dbClient[table].findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json({ items: answer ? [answer] : [] });
  };
