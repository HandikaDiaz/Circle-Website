import { z } from "zod";

export const loginSchema = z.object({
    email : z.string().email("Please write your email correctly!"),
    password : z.string().min(4, "Password must be at least 4 characters!"),
});

export type LoginFormInput = z.infer<typeof loginSchema>