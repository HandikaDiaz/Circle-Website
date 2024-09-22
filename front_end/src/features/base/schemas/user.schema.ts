import { string, z } from "zod";

export const updateUserSchema = z.object({
    fullName : string(),
    userName : string(),
    bio : string(),
});

export type UpdateUserFormInput = z.infer<typeof updateUserSchema>;