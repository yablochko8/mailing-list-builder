import { dbClient } from "../utils/dbClient";
import { TransferTypes } from "./transferTypes";

export const getAllHandler =
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

export const getOneHandler =
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
