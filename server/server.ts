import express from "express";
import cors from "cors";

export const PORT = 4101;

const app = express();

app.use(express.json());
app.use(cors());

/**
 *
 * Creating new things
 *
 * POST /sender/new
 * GET  /sender/all
 * GET  /sender/:id
 *
 * POST /recipient/new
 * POST /recipient/all  ? do we need all these /all endpoints for basic flow ?
 * GET  /recipient/:id
 *
 * POST /list/new       -> inputs: sender, recipient[]
 * GET  /list/all
 * GET  /list/:id
 * DELETE /list/:id
 *
 * POST /blast/new      -> inputs: sender, list[]
 * GET  /blast/all
 * GET  /blast/:id
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
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
