import express from "express";
import { registerController, loginController } from "../controllers/auth.js";
const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);

export { router as authRouter };
