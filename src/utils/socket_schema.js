import { z } from "zod";

export const sendMessageSchema = z.object({
  chatId: z.string(),
  content: z.string().min(1).max(5000),
});
