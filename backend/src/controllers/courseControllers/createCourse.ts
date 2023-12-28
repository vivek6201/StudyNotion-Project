import { Request, Response } from "express";
import {
  courseValidations,
  sectionValidations,
  subSectionValidations,
} from "../../validations/courseValidations/courseValidations";
import statusCode from "../../utils/statusCodes";
import * as z from "zod";
import { FileArray } from "express-fileupload";
import Category from "../../schema/courseSchema/courseCategory";
import fileUploadCloudinary from "../../services/fileUploader";
import Course from "../../schema/courseSchema/courseSchema";
import User from "../../schema/userSchema/userSchema";
import Section from "../../schema/courseSchema/courseSection";
import subSection from "../../schema/courseSchema/courseSubSection";

export const createCourseController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.headers;
    const bodyData = req.body;
    const { courseThumbnail } = req.files as FileArray;
    const isValidData = courseValidations.safeParse(bodyData);

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

    const validatedData: z.infer<typeof courseValidations> =
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
) => {
  try {
    const { id: courseId } = req.params;
    const isValidData = sectionValidations.safeParse(req.body);

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

    const validatedData: z.infer<typeof sectionValidations> =
      isValidData.data;

    const courseExists = await Course.findById(courseId);

    if (!courseExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Invalid Course Id",
      });
    }

    const newSection = await Section.create({
      courseId: courseId,
      sectionName: validatedData.sectionName,
      sectionDescription: validatedData.sectionDescription,
    });

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    );

    return res.status(statusCode.CREATED).json({
      message: "Section Created Created",
    });
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const createCourseSubSectionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: sectionId } = req.params;
    const { lectureVideo } = req.files as FileArray;

    const isValidData = subSectionValidations.safeParse(req.body);

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

    const validatedData: z.infer<typeof subSectionValidations> =
      isValidData.data;

    const checkSection = await Section.findById(sectionId);

    if (!checkSection) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Section not found",
      });
    }

    if (!lectureVideo) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "lecture video not provided",
      });
    }

    let videoUrl: string = "";
    try {
      const res = await fileUploadCloudinary(
        lectureVideo,
        process.env.FOLDER_NAME!
      );
      videoUrl = res.secure_url;
    } catch (error) {
      console.error(error);
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Error while uploading video",
      });
    }

    const newSubSection = await subSection.create({
      sectionId,
      ...validatedData,
    });

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { sectionContent: newSubSection },
      },
      { new: true }
    )
      .populate("sectionContent")
      .exec();

    return res.status(statusCode.CREATED).json({
      message: "Sub Section Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "internal server error",
    });
  }
};
