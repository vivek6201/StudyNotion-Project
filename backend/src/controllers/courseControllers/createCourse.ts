import { Request, Response } from "express";
import { createCourseValidations } from "../../validations/courseValidations/courseValidations";
import statusCode from "../../utils/statusCodes";
import * as z from "zod";
import { FileArray } from "express-fileupload";
import Category, {
  ICourseCategory,
} from "../../schema/courseSchema/courseCategory";
import fileUploadCloudinary from "../../services/fileUploader";
import Course, { ICourse } from "../../schema/courseSchema/courseSchema";
import User from "../../schema/userSchema/userSchema";

export const createCourseController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.headers;
    const bodyData = req.body;
    const { courseThumbnail } = req.files as FileArray;
    const isValidData = createCourseValidations.safeParse(bodyData);

    if (!isValidData.success) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Invalid Data",
        error: isValidData.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      });
    }

    if (!courseThumbnail) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Course Thumbnail is missing",
      });
    }

    const validatedData: z.infer<typeof createCourseValidations> =
      isValidData.data;

    const categoryExists = await Category.findById(
      validatedData.courseCategory
    );

    if (!categoryExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Category not found",
      });
    }

    const thumbnailUrl: string = (
      await fileUploadCloudinary(courseThumbnail, process.env.FOLDER_NAME!)
    ).secure_url;

    const newCourse = await Course.create({
      ...validatedData,
      courseThumbnail: thumbnailUrl,
    });

    await Category.findByIdAndUpdate(
      categoryExists._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(statusCode.CREATED).json({
      massage: "course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const createCourseSectionController = async (
  req: Request,
  res: Response
) => {};

export const createCourseSubSectionController = async (
  req: Request,
  res: Response
) => {};
