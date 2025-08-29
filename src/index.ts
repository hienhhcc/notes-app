import { notesRouter } from "@/routes/note.js";
import express, { ErrorRequestHandler, NextFunction } from "express";

const app = express();
const PORT = 3001;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log("App in running on PORT: " + PORT);
  });
};

startServer();

app.use((req, res, next: NextFunction) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Method": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Credentials": "true",
  });
  next();
});

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
