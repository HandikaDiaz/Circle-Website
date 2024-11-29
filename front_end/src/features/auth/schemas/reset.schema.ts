import { z } from "zod";

export const resetSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string().min(8, { message: "Please confirm your password." })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type ResetFormInput = z.infer<typeof resetSchema>