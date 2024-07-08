import express from "express";
import cors from "cors";
import { dbClient } from "./utils/dbClient";

export const PORT = 4101;

const app = express();

app.use(express.json());
app.use(cors());

/**
 *
 * Creating new things
 *
 * POST /sender/new     ->  clerkId, name, email
 * PUT  /sender/:id     +   List[], Blast[]
 * GET  /sender/:id
 * GET  /sender/all
 *
 * POST /recipient/new  ->  name, email
 * PUT  /recipient/:id  +   Message[], Lists[]
 * GET  /recipient/:id
 * POST /recipient/all
 *
 * POST /list/new       ->  Sender, name
 * PUT  /list/:id       +   Recipient[], Blast[]
 * GET  /list/:id
 * GET  /list/all
 *
 * POST /blast/new      ->  Sender, name
 * PUT  /blast/:id      +   List[], Message[], status
 * GET  /blast/:id
 * GET  /blast/all
 *
 * POST /message/new    ->  Blast, Recipient
 * PUT  /message/:id    +   content, status, sentAt, mailClient
 * GET  /message/:id
 * GET  /message/all
 *
 * Add later...
 *
 * DELETE /sender/:id
 * DELETE /recipient/:id
 * DELETE /list/:id
 * DELETE /blast/:id
 * DELETE /message/:id
 *
 *
 */

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

const storedValues: string[] = [];

app.post("/newmessage", async (req, res) => {
  console.log("POST endpoint called.");
  const newMessage = req.body.message;
  storedValues.push(newMessage);
  res.json({ messages: storedValues });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
