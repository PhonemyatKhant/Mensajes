import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("This is not a valid email!"),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const registerSchema = z.object({
  email: z.string().email("This is not a valid email!"),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
  username: z.string().min(1, { message: "Username is required" }),
});
