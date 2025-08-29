import { notesRouter } from "@/routes/note.js";
import express, { ErrorRequestHandler } from "express";

const app = express();
const PORT = 3001;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log("App in running on PORT: " + PORT);
  });
};

startServer();

app.use(express.json());

app.use("/", (_req, res) => {
  res.send("hello");
});

app.use("/notes", notesRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(errorHandler);
