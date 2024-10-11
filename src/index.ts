import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/mongodb";

//For being able to read env files.
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

//For being able to read json files.
app.use(express.json());

//for added security to avoid cross site attacks.
const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Implementing a ping endpoint for checking if the server is working.
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

//This function is to ensure the database connection happens before the server starts listening
const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
};

//Running the main function
startServer();
