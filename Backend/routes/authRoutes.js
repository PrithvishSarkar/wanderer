import express from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
import logoutController from "../controllers/logoutController.js";
import getUserController from "../controllers/getUserController.js";
import protectedRouteMiddleware from "../middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/get-user-data", protectedRouteMiddleware, getUserController);
router.get("/logout", protectedRouteMiddleware, logoutController);

export default router;