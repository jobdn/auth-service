import { Router } from "express";
import { authController } from "../controllers/AuthController.js";
import { userController } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/auth.js";

export const router = Router();

router.post("/auth-service/login", authController.login);
router.post("/logout", authController.logout);
router.get("/auth-service/refreshTokens", authController.refresh);
router.get("/users/:email", authMiddleware, userController.userByEmail);
