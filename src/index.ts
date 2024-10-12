import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/mongodb";
import authRouter from "./router/authRouter";
import cookieParser from "cookie-parser";
import webtoonRouter from "./router/popularRouter";
//For being able to read env files.
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

//For being able to read json files.
app.use(express.json());

//For reading cookies
app.use(cookieParser());

//for added security to avoid cross site attacks.
const allowedOrigins = [
  process.env.FRONTEND_URL, // Main frontend
  // Add additional preview domains if needed
  /^https:\/\/ghackk-frontend.*\.vercel\.app$/, // Regex to match any preview domains
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.some((allowedOrigin) => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};

app.use(cors());
app.options("*", cors());

// Implementing a ping endpoint for checking if the server is working.
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.use("/auth", authRouter);
app.use("/webtoons", webtoonRouter);
//This function is to ensure the database connection happens before the server starts listening
const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
};

//Running the main function
startServer();
