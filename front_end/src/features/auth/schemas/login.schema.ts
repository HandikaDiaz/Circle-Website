import { z } from "zod";

export const loginSchema = z.object({
    userName: z.string().optional(),
    password : z.string().min(4, "Password must be at least 4 characters!"),
});

export type LoginFormInput = z.infer<typeof loginSchema>