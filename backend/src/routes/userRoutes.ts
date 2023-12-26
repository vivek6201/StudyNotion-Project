import express from "express";
import {
  getUserDataController,
  getUserCoursesController,
} from "../controllers/profileControllers/getUserInfo";
import {
  updateUserDataController,
  updateUserProfilePicController,
} from "../controllers/profileControllers/updateUserInfo";
import { deleteUserController } from "../controllers/profileControllers/deleteUserController";
import { isAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/user-info", isAuth, getUserDataController);
router.get("/get-user-course", isAuth, getUserCoursesController);
router.put("/update-user-info", isAuth, updateUserDataController);
router.patch("/update-profile-pic", isAuth, updateUserProfilePicController);
router.delete("/delete-user", isAuth, deleteUserController);

export default router;
