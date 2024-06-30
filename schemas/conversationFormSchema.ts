import { z } from "zod";

export const conversationFormSchema = z.object({
  message: z.string().min(1),
});
