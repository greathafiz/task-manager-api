import express from "express";
const router = express.Router();
import {
  fetchAllTasks,
  fetchTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.js";

router.route("/").get(fetchAllTasks).post(createTask);
router.route("/:id").get(fetchTask).patch(updateTask).delete(deleteTask);

export { router as tasksRouter };
