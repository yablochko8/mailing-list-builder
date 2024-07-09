import express from "express";
import { dbClient } from "../../utils/dbClient";
import { TransferTypes } from "../transferTypes";

// import { OutputDto } from "../transferTypes"

const router = express.Router();

// This route is for SENDER
const focus = "sender";

const dbTable = dbClient[focus];

const getAllHandler =
  <Table extends keyof TransferTypes>(table: Table, limit: number = 10) =>
  async (
    req: TransferTypes[Table]["req"],
    res: TransferTypes[Table]["res"]
  ) => {
    console.log("GET /all route called:", table);
    const answerList = await dbClient[table].findMany({
      take: limit,
    });
    res.json({ senders: answerList });
  };

router.get("/all", getAllHandler("sender"));

router.get("/:id", async (req, res) => {
  console.log("GET route called:", focus);
  const { id } = req.params;
  const answer = await dbTable.findUnique({
    where: {
      clerkId: id,
    },
  });
  res.json({ answer });
});

// *
// * POST /sender/new     ->  clerkId, name, email
// * PUT  /sender/:id     +   List[], Blast[]
// * GET  /sender/:id
// * GET  /sender/all
// * DELETE /sender/:id

const senderRouter = router;

export default senderRouter;
