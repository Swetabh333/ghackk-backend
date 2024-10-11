import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/mongodb";
import authRouter from "./router/authRouter";
import cookieParser from "cookie-parser";
import webToon from "./schema/webtoonSchema";

//For being able to read env files.
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

//For being able to read json files.
app.use(express.json());

//For reading cookies
app.use(cookieParser());

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

app.use("/auth", authRouter);

//This function is to ensure the database connection happens before the server starts listening
const startServer = async () => {
  await connectToDatabase();
  await webToon.create({
    Name: "wt1",
    Genre: "g1",
    Creator: "c1",
    img_url: "i1",
    short_description: "...",
  });
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
};

//Running the main function
startServer();
