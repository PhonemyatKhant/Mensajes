import { z } from "zod";

export const memberSchema = z.object({ label: z.string(), value: z.string() });

export const groupChatSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Group name must have at leat 1 character!" }),
  members: z.array(memberSchema),
});
