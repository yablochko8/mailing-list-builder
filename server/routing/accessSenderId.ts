import { dbClient } from "../utils/dbClient";

export const accessSenderId = async (
  clerkId: string | null
): Promise<number | null> => {
  if (!clerkId) return null;
  try {
    const sender = await dbClient.sender.findUnique({
      where: {
        clerkId: clerkId,
      },
      select: {
        id: true,
      },
    });

    return sender ? sender.id : null;
  } catch (error) {
    console.error("Error accessing the database:", error);
    return null;
  }
};
