import { z } from "zod";

export const profileSettingsSchema = z.object({
  name: z.string().nullable(),
  image: z.string().nullable(),
});
