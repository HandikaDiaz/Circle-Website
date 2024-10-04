import { string, z } from "zod";

export const updateUserSchema = z.object({
    fullName : string(),
    userName : string(),
    bio : string(),
    image: z.instanceof(FileList).optional(),
    background: z.instanceof(FileList).optional()
});

export type UpdateUserFormInput = z.infer<typeof updateUserSchema>;