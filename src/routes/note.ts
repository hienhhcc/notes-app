import express, { Request, Response } from "express";
import { db } from "../drizzle/db.ts";
import { NoteTable } from "../drizzle/schema.ts";
import { validate } from "../middleware/validate.ts";
import { createNoteSchema } from "../schema/note.ts";

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
