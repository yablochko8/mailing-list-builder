import express from "express";
import { dbClient } from "../../utils/dbClient";
import { getAllHandler, getOneHandler } from "../genericHandlers";

const router = express.Router();

// This route is for SENDER
const focus = "sender";

const dbTable = dbClient[focus];

router.get("/all", getAllHandler(focus));
router.get("/:id", getOneHandler(focus));

// *
// * POST /sender/new     ->  clerkId, name, email
// * PUT  /sender/:id     +   List[], Blast[]
// * GET  /sender/:id
// * GET  /sender/all
// * DELETE /sender/:id

const senderRouter = router;

export default senderRouter;
