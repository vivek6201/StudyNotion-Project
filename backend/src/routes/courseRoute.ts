import express from "express";
import { isAuth, isInstuctor, isStudent } from "../middlewares/auth";
import {
  getAllCoursesController,
  getCourseController,
} from "../controllers/courseControllers/getCourses";
import {
  createCourseController,
  createCourseSectionController,
  createCourseSubSectionController,
} from "../controllers/courseControllers/createCourse";
import {
  updateCourseController,
  updateCourseSectionController,
  updateCourseSubSectionController,
} from "../controllers/courseControllers/updateCourse";
import {
  deleteCourseController,
  deleteCourseSectionController,
  deleteCourseSubSectionController,
} from "../controllers/courseControllers/deleteCourse";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
} from "../controllers/categoryControllers/categoryControllers";
import {
  createCourseReviewController,
  getCourseRatingController,
} from "../controllers/otherControllers/ratingReviewControllers";

const router = express.Router();

//courses routes
router.get("/get-all-courses", getAllCoursesController);
router.get("/get-course/:id", getCourseController);
router.post("/create-course", isAuth, isInstuctor, createCourseController);
router.post(
  "/create-section/:id",
  isAuth,
  isInstuctor,
  createCourseSectionController
);
router.post(
  "/create-subSection/:id",
  isAuth,
  isInstuctor,
  createCourseSubSectionController
);
router.patch(
  "/update-course/:courseId",
  isAuth,
  isInstuctor,
  updateCourseController
);
router.patch(
  "/update-section/:sectionId",
  isAuth,
  isInstuctor,
  updateCourseSectionController
);
router.patch(
  "/update-subSection/:subSectionId",
  isAuth,
  isInstuctor,
  updateCourseSubSectionController
);

router.delete(
  "/delete-section/:sectionId",
  isAuth,
  isInstuctor,
  deleteCourseSectionController
);
router.delete(
  "/delete-subSection/:subSectionId",
  isAuth,
  isInstuctor,
  deleteCourseSubSectionController
);
router.delete("/delete-course", isAuth, isInstuctor, deleteCourseController);

//rating and review routes
router.post("/create-review", isAuth, isStudent, createCourseReviewController);
router.get("/get-course-rating", getCourseRatingController);

//category routes
router.get("/get-categories", getAllCategoriesController);
router.post("/create-category", isAuth, isInstuctor, createCategoryController);
router.delete(
  "/delete-category/:id",
  isAuth,
  isInstuctor,
  deleteCategoryController
);

export default router;
