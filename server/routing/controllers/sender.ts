import express from "express";
import { dbClient } from "../../utils/dbClient";
import { getAll, getOne, getSearch } from "../genericHandlers";

const focus = "sender";

/**
 * <STANDARD ROUTES>
 */
const router = express.Router();
router.get("/all", getAll(focus));
router.get("/:id", getOne(focus));
router.get("/search/:query", getSearch(focus));
/**
 * </STANDARD ROUTES>
 */

const dbTable = dbClient[focus];

// *
// * POST /sender/new     ->  clerkId, name, email
// * PUT  /sender/:id     +   List[], Blast[]
// * DELETE /sender/:id

const senderRouter = router;

export default senderRouter;
