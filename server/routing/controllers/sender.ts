import express from "express";
import { dbClient } from "../../utils/dbClient";
import { deleteOne, getAll, getOne, getSearch } from "../genericHandlers";

const focus = "sender";

/**
 * <STANDARD ROUTES>
 */
const router = express.Router();
router.get("/all", getAll(focus));
router.get("/:id", getOne(focus));
router.get("/search/:query", getSearch(focus));
router.delete("/:id", deleteOne(focus));
/**
 * </STANDARD ROUTES>
 */

const dbTable = dbClient[focus];

/**
 * ADD NEW ITEM
 *
 * This is NOT subject to the same strict format of req and res
 * defined in transferTypes.ts but aspires to match it.
 */
router.post("/new", async (req, res) => {
  console.log("POST /new endpoint called.");
  const { clerkId, name, email } = req.body;
  console.log("Creating entry using data:", { clerkId, name, email });
  try {
    const newSender = await dbTable.create({
      data: {
        clerkId,
        name,
        email,
      },
    });
    res.json({ items: newSender });
  } catch (error) {
    console.error("Error creating new sender:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * UPDATE AN ITEM
 *
 * This is NOT subject to the same strict format of req and res
 * defined in transferTypes.ts but aspires to match it.
 */
router.put("/:id", async (req, res) => {
  console.log("PUT endpoint called.");
  const { id } = req.params;
  const updateData = req.body;
  console.log("Updating entry using data:", updateData);

  try {
    // Don't let REST calls change system columns or other sensitive
    const fieldsToExclude = [
      "id",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "version",
      // add in clerkId here? maybe
    ];
    // Look at all other columns in the database, and any of these that are present
    // in the req body should be treated as updates
    const fieldsToUpdate = Object.keys(dbTable.fields).reduce((acc, field) => {
      if (updateData[field] !== undefined && !fieldsToExclude.includes(field)) {
        acc[field] = updateData[field];
      }
      return acc;
    }, {});

    // Apply the update
    const updatedItem = await dbTable.update({
      where: { id: Number(id) },
      data: {
        ...fieldsToUpdate,
        version: {
          increment: 1,
        },
      },
    });

    // Return the updated item
    res.json({ items: [updatedItem] });
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const senderRouter = router;

export default senderRouter;
