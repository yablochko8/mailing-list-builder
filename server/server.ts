import express from "express";
import cors from "cors";
import { dbClient } from "./utils/dbClient";
import senderRouter from "./routing/controllers/sender";
import recipientRouter from "./routing/controllers/recipient";
import listRouter from "./routing/controllers/list";
import blastRouter from "./routing/controllers/blast";
import messageRouter from "./routing/controllers/message";

export const PORT = 4101;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/sender", senderRouter);
app.use("/api/recipient", recipientRouter);
app.use("/api/list", listRouter);
app.use("/api/blast", blastRouter);
app.use("/api/message", messageRouter);

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
