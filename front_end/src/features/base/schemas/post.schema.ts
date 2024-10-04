import { z } from "zod";

export const postSchema = z.object({
    content : z.string().min(4, "At least 4 characters required!"),
    image : z.instanceof(FileList).optional(),
});

export type CreatePostFormInput = z.infer<typeof postSchema>;