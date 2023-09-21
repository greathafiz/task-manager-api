import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, NotFoundError } from "../errors/custom-errors.js";

const registerController = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.generateJWT();
  res.status(StatusCodes.CREATED).json({ user: user.name, token });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError(`There's no user with the email: ${email}`);
  }

  const isPassword = user.checkPassword(password);

  if (!isPassword) {
    throw new BadRequestError("Password is incorrect");
  }

  const token = user.generateJWT();
  res.status(StatusCodes.CREATED).json({ user: user.name, token });
};

export { registerController, loginController };
