import express from "express";
import { userLoginController } from "../controllers/authControllers/loginController";
import { userSignupController } from "../controllers/authControllers/signupController";
import {
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/authControllers/passwordController";

const router = express.Router();

//Auth Controllers
router.post("/register", userSignupController);
router.post("/login", userLoginController);

//Password Controllers
router.post("/forgot-pass", forgotPasswordController);
router.patch("/reset-pass", resetPasswordController);
router.post("/change-pass", changePasswordController);

export default router;
