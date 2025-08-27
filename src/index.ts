import bodyParser from "body-parser";
import express from "express";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use("/", (req, res) => {
  res.send("hello");
});

const startServer = async () => {
  app.listen(PORT, () => {
    console.log("App in running on PORT: " + PORT);
  });
};

startServer();
