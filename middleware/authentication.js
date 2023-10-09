import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/custom-errors.js";

const verifyToken = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new UnauthorizedError("Token not provided");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name: decoded.name, userId: decoded.userId };
    // console.log(req.user);
    next();
  } catch (error) {
    throw new UnauthorizedError(`Authentication failed. You are not authorized to access this route`);
  }
};

export default verifyToken;
