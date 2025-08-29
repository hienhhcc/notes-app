import { db } from "@/drizzle/db";
import { NoteTable } from "@/drizzle/schema";
import { validate } from "@/middleware/validate";
import { createNoteSchema } from "@/schema/note";
import express, { Request, Response } from "express";

export const notesRouter = express.Router();

notesRouter.get("/", async (req, res, next) => {
  const notes = await db.query.NoteTable.findMany();

  if (notes == null) {
    next("Something went wrong");
  } else {
    return res.status(200).json({
      success: true,
      notes,
    });
  }
});

notesRouter.post(
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

    return res.status(201).json({ success: true, newNote: note });
  }
);
