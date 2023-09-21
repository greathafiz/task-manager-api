import express from "express";
import "dotenv/config";
import "express-async-errors";
import { authRouter } from "./routes/auth.js";
import { tasksRouter } from "./routes/tasks.js";
import connectDB from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import verifyToken from "./middleware/authentication.js";

const app = express();

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
