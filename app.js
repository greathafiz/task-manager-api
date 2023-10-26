import "dotenv/config";
import "express-async-errors";
import { authRouter } from "./routes/auth.js";
import { tasksRouter } from "./routes/tasks.js";
import connectDB from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import verifyToken from "./middleware/authentication.js";

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";


import express from "express";
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", verifyToken, tasksRouter);

app.get("/", (req, res) => {
  res.send("<h3>To-do list API</h3>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 9000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
