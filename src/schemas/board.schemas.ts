import { z } from "zod";

// Board visibility enum
const visibilityEnum = z.enum(["PUBLIC", "PRIVATE"], {
  message: "Visibility must be Public or Private",
});

// board schema
export const boardSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Board name is required" })
    .max(100, { message: "Board name must be less than 100 characters" }),
  visibility: visibilityEnum,
});

export type BoardData = z.infer<typeof boardSchema>;
