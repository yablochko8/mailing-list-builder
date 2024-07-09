import express from "express";
import cors from "cors";
import { dbClient } from "./utils/dbClient";
import senderRouter from "./routing/controllers/sender";

export const PORT = 4101;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/sender", senderRouter);

/**
 * New sender, requires clerkId, name, email
 */
app.post("/sender/new", async (req, res) => {
  console.log("POST endpoint called.");
  const { clerkId, name, email } = req.body;

  if (!clerkId || !name || !email) {
    return res
      .status(400)
      .json({ error: "clerkId, name, and email are required" });
  }

  try {
    const newSender = await dbClient.sender.create({
      data: {
        clerkId,
        name,
        email,
      },
    });
    res.status(201).json(newSender);
  } catch (error) {
    console.error("Error creating new sender:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/sender/new", async (req, res) => {
  console.log("POST endpoint called.");
  const newMessage = req.body.message;
  storedValues.push(newMessage);
  res.json({ messages: storedValues });
});

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
