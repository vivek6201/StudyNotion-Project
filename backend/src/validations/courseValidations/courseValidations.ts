import * as z from "zod";
import { courseStatus } from "../../utils/constants";

export const courseValidations = z.object({
  courseName: z.string().min(3).max(50),
  courseDescription: z.string().min(3).max(500),
  courseContent: z.array(z.string()).optional(),
  courseCategory: z.string(),
  ratingAndReviews: z.array(z.string()).optional(),
  studentsEnrolled: z.array(z.string()).optional(),
  isDiscounted: z.boolean().default(false),
  discount: z.number().optional(),
  courseStatus: z.string().default(courseStatus.DRAFT),
  coursePrice: z.string(),
  courseInstructor: z.string(),
});

export const sectionValidations = z.object({
  sectionName: z.string().min(3).max(50),
  sectionDescription: z.string().min(3).max(500),
  sectionContent: z.array(z.string()).optional(),
});

export const subSectionValidations = z.object({
  subSectionName: z.string().min(3).max(50),
  subSectionDescription: z.string().min(3).max(500),
  duration: z.string(),
});

export const courseProgressValidations = z.object({
  courseId: z.string(),
  progress: z.number().default(0),
  completed: z.boolean().optional(),
});

export const createCourseCategoryValidations = z.object({
  categoryName: z.string(),
  categoryDescription: z.string(),
  courses: z.array(z.string()).default([]),
});

export const createCourseReviewValidations = z.object({
  courseId: z.string(),
  rating: z.number().default(0),
  review: z.string(),
});
