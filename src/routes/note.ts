import { db } from "@/drizzle/db";
import { NoteTable } from "@/drizzle/schema";
import { validate } from "@/middleware/validate";
import { createNoteSchema, updateNoteSchema } from "@/schema/note";
import { eq } from "drizzle-orm";
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

notesRouter.patch(
  "/:id",
  validate({ body: updateNoteSchema }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const [note] = await db
      .update(NoteTable)
      .set({ title, content })
      .where(eq(NoteTable.id, id))
      .returning();

    if (!note) {
      return res.status(500).json({ error: "Something went wrong!" });
    }

    return res.status(201).json({ success: true, updatedNote: note });
  }
);

notesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const [deletedNote] = await db
    .delete(NoteTable)
    .where(eq(NoteTable.id, id))
    .returning();

  if (!deletedNote) {
    return res.status(500).json({ error: "Something went wrong!" });
  }

  return res.status(200).json({ success: true, deletedNote });
});
