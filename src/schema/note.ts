import { z } from "zod";

export const createNoteSchema = z
  .object({
    title: z
      .string()
      .min(6, "Title must be at least 6 characters")
      .max(100, "Title must not exceed 100 characters"),
    content: z
      .string()
      .min(15, "Content must be at least 15 characters")
      .max(300, "Content must not be exceed 300 characters"),
  })
  .strict();
