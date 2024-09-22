import { z } from "zod";

export const replySchema = z.object({
    content : z.string().min(4, "At least 4 characters required!"),
    image : z.string().optional()
});

export type CreateReplyFormInput = z.infer<typeof replySchema>;