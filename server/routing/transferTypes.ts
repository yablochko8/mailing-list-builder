/**
 *
 * DTOs are Data Transfer Objects
 *
 * Input DTO: structure of data going client -> server
 *
 * Output DTO: structure of data going server -> client
 *
 * This lets us define shape of data for API requests and responses.
 * Input typically contains less than Output. Output usually includes
 * additional server-generated information (like an id) that's sent
 * back to the client.
 *
 * Creating new things
 *
 * POST /sender/new     ->  clerkId, name, email
 * PUT  /sender/:id     +   List[], Blast[]
 * GET  /sender/:id
 * GET  /sender/all
 *
 * POST /recipient/new  ->  Sender, name, email
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

import { Request, Response } from "express";
import { Sender } from "@prisma/client";

// export type SenderInput = {
//   email: string;
// };

export type SenderOutput = {
  items: Sender[];
};

export type TransferTypes = {
  sender: { req: Request; res: Response<SenderOutput> };
};
