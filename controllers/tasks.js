import Task from "../models/Task.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/custom-errors.js";

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json(task);
};

const fetchAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res
    .status(StatusCodes.OK)
    .json({ user: req.user.name, tasks, total: tasks.length });
};

const fetchTask = async (req, res) => {
  const {
    params: { id: taskId },
    user: { userId },
  } = req;

  const task = await Task.find({ _id: taskId, createdBy: userId });

  if (!task) {
    throw new NotFoundError(`Sorry. Task with id: ${taskId} doesn't exist`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const {
    params: { id: taskId },
    user: { userId },
  } = req;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!task) {
    throw new NotFoundError(`Sorry. Task with id: ${taskId} doesn't exist`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const {
    params: { id: taskId },
    user: { userId },
  } = req;

  const task = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });

  if (!task) {
    throw new NotFoundError(`Sorry. Task with id: ${taskId} doesn't exist`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Task deleted successfully", success: true });
};

export { fetchAllTasks, fetchTask, createTask, updateTask, deleteTask };
