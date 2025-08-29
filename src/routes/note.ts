import { db } from "@/drizzle/db.js";
import { NoteTable } from "@/drizzle/schema.js";
import { validate } from "@/middleware/validate.js";
import { createNoteSchema } from "@/schema/note.js";
import express, { Request, Response } from "express";

export const notesRouter = express.Router();

notesRouter.get(
  "/",
  validate({ body: createNoteSchema }),
  async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const [note] = await db
      .insert(NoteTable)
      .values({
        title,
        content,
      })
      .returning();

    if (!note) {
      return res.status(500).json({ error: "Something went wrong!" });
    }

    return res.status(200).json({ success: true, newNote: note });
  }
);
