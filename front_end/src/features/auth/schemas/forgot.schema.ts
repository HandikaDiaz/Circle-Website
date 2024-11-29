import { z } from "zod";

export const forgotSchema = z.object({
    userName: z.string()
});

export type ForgotFormInput = z.infer<typeof forgotSchema>